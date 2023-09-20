module.exports = class Data1695194382416 {
    name = 'Data1695194382416'

    async up(db) {
        await db.query(`DROP INDEX "public"."IDX_1f45de0713a55049009e8e8127"`)
        await db.query(`CREATE INDEX "IDX_1f45de0713a55049009e8e8127" ON "extrinsic" ("hash") `)
    }

    async down(db) {
        await db.query(`CREATE UNIQUE INDEX "IDX_1f45de0713a55049009e8e8127" ON "extrinsic" ("hash") `)
        await db.query(`DROP INDEX "public"."IDX_1f45de0713a55049009e8e8127"`)
    }
}
