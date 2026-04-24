process: migrate
	@node -r dotenv/config lib/processor.js


build:
	@npm run build


serve:
	@node lib/graphql-server-bootstrap.js


migrate:
	@node db/init.js


migration:
	@npx squid-typeorm-migration generate


codegen:
	@npx squid-typeorm-codegen


typegen:
	@npx squid-substrate-typegen typegen.json


up:
	@docker-compose up -d


down:
	@docker-compose down


.PHONY: build serve process migrate codegen typegen up down
