module.exports = class Data1706713918475 {
    name = 'Data1706713918475'

    async up(db) {
        await db.query(`ALTER TABLE "transfer" ALTER COLUMN "event_index" SET NOT NULL`)
        await db.query(`CREATE UNIQUE INDEX "IDX_38b7c6782957e94a618be835ec" ON "block" ("height", "finalized") `)
    }

    async down(db) {
        await db.query(`ALTER TABLE "transfer" ALTER COLUMN "event_index" DROP NOT NULL`)
        await db.query(`DROP INDEX "public"."IDX_38b7c6782957e94a618be835ec"`)
    }
}
