const fs = require('fs');
const path = require('path');

const PATCH_MARKER = 'Invalid GraphQL request body. Send JSON once, or a raw GraphQL document.';

function patchOpenreaderServer(filePath) {
  const source = fs.readFileSync(filePath, 'utf8');

  if (source.includes(PATCH_MARKER)) {
    return false;
  }

  const hook = `    if (options.graphiqlConsole !== false) {\n        setupGraphiqlConsole(app);\n    }\n    await apollo.start();\n`;

  const patchedHook = `    function looksLikeGraphqlDocument(value) {\n        const trimmed = value.trimStart();\n        return trimmed.startsWith('{')\n            || trimmed.startsWith('query ')\n            || trimmed.startsWith('mutation ')\n            || trimmed.startsWith('subscription ')\n            || trimmed.startsWith('fragment ');\n    }\n    function parseGraphqlBody(req, rawBody) {\n        if (rawBody == null) {\n            return {};\n        }\n        if (typeof rawBody !== 'string') {\n            return rawBody;\n        }\n        const contentType = (req.get('content-type') || '').toLowerCase();\n        const trimmed = rawBody.trim();\n        if (!trimmed) {\n            return {};\n        }\n        let parsed;\n        try {\n            parsed = JSON.parse(trimmed);\n        }\n        catch (error) {\n            if (contentType.includes('application/graphql')\n                || contentType.includes('text/plain')\n                || looksLikeGraphqlDocument(trimmed)) {\n                return { query: trimmed };\n            }\n            throw error;\n        }\n        if (typeof parsed === 'string') {\n            const nested = parsed.trim();\n            if (!nested) {\n                return {};\n            }\n            try {\n                return JSON.parse(nested);\n            }\n            catch (error) {\n                if (looksLikeGraphqlDocument(nested)) {\n                    return { query: nested };\n                }\n                throw error;\n            }\n        }\n        if (parsed === null || typeof parsed !== 'object') {\n            throw new Error('GraphQL request body must be a JSON object.');\n        }\n        return parsed;\n    }\n    if (options.graphiqlConsole !== false) {\n        setupGraphiqlConsole(app);\n    }\n    app.use('/graphql', express_1.default.text({\n        type: (req) => req.method === 'POST',\n        limit: maxRequestSizeBytes\n    }));\n    app.use('/graphql', (req, res, next) => {\n        if (req.method !== 'POST')\n            return next();\n        try {\n            req.body = parseGraphqlBody(req, req.body);\n            return next();\n        }\n        catch (error) {\n            res.status(400).type('text/plain').send('Invalid GraphQL request body. Send JSON once, or a raw GraphQL document.');\n            return undefined;\n        }\n    });\n    await apollo.start();\n`;

  const bodyParser = `    apollo.applyMiddleware({\n        app,\n        bodyParserConfig: {\n            limit: maxRequestSizeBytes\n        }\n    });\n`;

  const patchedBodyParser = `    apollo.applyMiddleware({\n        app,\n        bodyParserConfig: false\n    });\n`;

  if (!source.includes(hook) || !source.includes(bodyParser)) {
    throw new Error(`Unsupported @subsquid/openreader server layout in ${filePath}`);
  }

  const patched = source
    .replace(hook, patchedHook)
    .replace(bodyParser, patchedBodyParser);

  fs.writeFileSync(filePath, patched);
  return true;
}

function main() {
  const target = require.resolve('@subsquid/openreader/lib/server.js');
  const changed = patchOpenreaderServer(target);
  const action = changed ? 'patched' : 'already patched';
  console.log(`[patch-squid-graphql-server] ${action}: ${path.relative(process.cwd(), target)}`);
}

main();
