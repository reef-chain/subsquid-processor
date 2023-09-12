module.exports = class Data1690269663991 {
    name = 'Data1690269663991'

    async up(db) {
        await db.query(`CREATE TABLE "pusher_message" ("id" character varying NOT NULL, "data" text NOT NULL, CONSTRAINT "PK_d6b6741a4454c73aac186c1cf74" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "pusher_message"`)
    }
}
