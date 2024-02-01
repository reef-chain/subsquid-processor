module.exports = class Data1706773853166 {
    name = 'Data1706773853166'

    async up(db) {
        await db.query(`CREATE TABLE "era_validator_info" ("id" character varying NOT NULL, "address" text NOT NULL, "era" integer NOT NULL, "total" numeric NOT NULL, "own" numeric NOT NULL, "others" jsonb NOT NULL, "others_who" text NOT NULL, CONSTRAINT "PK_8a494e2a4a4400b9297e2a6bec8" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_dfd7ca31da5e222e785d0fbdfb" ON "era_validator_info" ("address") `)
        await db.query(`CREATE INDEX "IDX_b827257aebfcc2d4eb76572d17" ON "era_validator_info" ("era") `)
    }

    async down(db) {
        await db.query(`DROP TABLE "era_validator_info"`)
        await db.query(`DROP INDEX "public"."IDX_dfd7ca31da5e222e785d0fbdfb"`)
        await db.query(`DROP INDEX "public"."IDX_b827257aebfcc2d4eb76572d17"`)
    }
}
