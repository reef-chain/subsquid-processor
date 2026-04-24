import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import { useServer } from 'graphql-ws/lib/use/ws';
import { WebSocketServer } from 'ws';
import { listen } from '@subsquid/util-internal-http-server';
import { openreaderExecute, openreaderSubscribe } from '@subsquid/openreader/lib/util/execute';

type ApolloOptions = {
  port: number;
  schema: unknown;
  context: unknown;
  disposals: Array<() => Promise<void> | void>;
  subscriptions?: boolean;
  log?: unknown;
  graphiqlConsole?: boolean;
  maxRequestSizeBytes?: number;
  maxRootFields?: number;
  cache?: unknown;
  plugins?: unknown[];
};

const openreaderServer: any = require('@subsquid/openreader/lib/server');

function looksLikeGraphqlDocument(value: string): boolean {
  const trimmed = value.trimStart();
  return trimmed.startsWith('{') ||
    trimmed.startsWith('query ') ||
    trimmed.startsWith('mutation ') ||
    trimmed.startsWith('subscription ') ||
    trimmed.startsWith('fragment ');
}

function parseGraphqlBody(req: { get(name: string): string | undefined }, rawBody: unknown): unknown {
  if (rawBody == null) {
    return {};
  }

  if (typeof rawBody !== 'string') {
    return rawBody;
  }

  const contentType = (req.get('content-type') || '').toLowerCase();
  const trimmed = rawBody.trim();

  if (!trimmed) {
    return {};
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(trimmed);
  } catch (error) {
    if (
      contentType.includes('application/graphql') ||
      contentType.includes('text/plain') ||
      looksLikeGraphqlDocument(trimmed)
    ) {
      return { query: trimmed };
    }
    throw error;
  }

  if (typeof parsed === 'string') {
    const nested = parsed.trim();
    if (!nested) {
      return {};
    }

    try {
      return JSON.parse(nested);
    } catch (error) {
      if (looksLikeGraphqlDocument(nested)) {
        return { query: nested };
      }
      throw error;
    }
  }

  if (parsed === null || typeof parsed !== 'object') {
    throw new Error('GraphQL request body must be a JSON object.');
  }

  return parsed;
}

async function tolerantRunApollo(options: ApolloOptions): Promise<any> {
  const {
    disposals,
    context,
    schema,
    maxRootFields,
  } = options;

  const maxRequestSizeBytes = options.maxRequestSizeBytes ?? 256 * 1024;
  const app = express();
  const server = http.createServer(app);
  const execute = (args: any) => openreaderExecute(args, { maxRootFields });
  const plugins = [...((options.plugins || []) as any[])];

  if (options.subscriptions) {
    const wsServer = new WebSocketServer({
      server,
      path: '/graphql',
      maxPayload: maxRequestSizeBytes,
    });

    const wsServerCleanup = useServer({
      schema: schema as any,
      context: context as any,
      execute,
      subscribe: openreaderSubscribe,
      onNext(_ctx, _message, args, result) {
        args.contextValue.openreader.close();
        return result;
      },
    }, wsServer);

    disposals.push(async () => wsServerCleanup.dispose());
  }

  const apollo = new ApolloServer({
    schema: schema as any,
    context: context as any,
    cache: options.cache as any,
    stopOnTerminationSignals: false,
    allowBatchedHttpRequests: false,
    executor: async (req: any) => {
      return execute({
        schema,
        document: req.document,
        rootValue: {},
        contextValue: req.context,
        variableValues: req.request.variables,
        operationName: req.operationName,
      });
    },
    plugins: [
      ...plugins,
      {
        async requestDidStart() {
          return {
            willSendResponse(req: any) {
              return req.context.openreader.close();
            },
          };
        },
      },
    ],
  });

  if (options.graphiqlConsole !== false) {
    openreaderServer.setupGraphiqlConsole(app);
  }

  app.use('/graphql', express.text({
    type: (req) => req.method === 'POST',
    limit: maxRequestSizeBytes,
  }));

  app.use('/graphql', (req: any, res: any, next: any) => {
    if (req.method !== 'POST') {
      return next();
    }

    try {
      req.body = parseGraphqlBody(req, req.body);
      return next();
    } catch (error) {
      res.status(400).type('text/plain').send(
        'Invalid GraphQL request body. Send JSON once, or a raw GraphQL document.'
      );
      return undefined;
    }
  });

  await apollo.start();
  disposals.push(() => apollo.stop());
  apollo.applyMiddleware({
    app,
    bodyParserConfig: false,
  });

  return listen(server, options.port);
}

openreaderServer.runApollo = tolerantRunApollo;

require('@subsquid/graphql-server/bin/run.js');
