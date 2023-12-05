module.exports = class Data1701680892940 {
    name = 'Data1701680892940'

    async up(db) {
        await db.query(`ALTER TABLE "transfer" ADD "reefswap_action" character varying(15)`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "transfer" DROP COLUMN "reefswap_action"`)
    }
}
