module.exports = class Data1684171397160 {
    name = 'Data1684171397160'

    async up(db) {
        await db.query(`ALTER TABLE "verified_contract" ADD "approved" boolean`)
        await db.query(`CREATE INDEX "IDX_2c834c0bad5cdbf5e455e04b25" ON "verified_contract" ("approved") `)
    }

    async down(db) {
        await db.query(`ALTER TABLE "verified_contract" DROP COLUMN "approved"`)
        await db.query(`DROP INDEX "public"."IDX_2c834c0bad5cdbf5e455e04b25"`)
    }
}
