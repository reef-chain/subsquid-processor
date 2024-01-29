module.exports = class Data1705404608307 {
    name = 'Data1705404608307'

    async up(db) {
        await db.query(`DROP INDEX "public"."IDX_51ae33a762c6d328b7f06682c4"`)
        await db.query(`ALTER TABLE "transfer" DROP COLUMN "fee_amount"`)
        await db.query(`ALTER TABLE "transfer" ADD "extrinsic_id" text`)
        await db.query(`ALTER TABLE "transfer" ADD "extrinsic_hash" text`)
        await db.query(`ALTER TABLE "transfer" ADD "signed_data" jsonb`)
    }

    async down(db) {
        await db.query(`CREATE INDEX "IDX_51ae33a762c6d328b7f06682c4" ON "transfer" ("fee_amount") `)
        await db.query(`ALTER TABLE "transfer" ADD "fee_amount" numeric NOT NULL`)
        await db.query(`ALTER TABLE "transfer" DROP COLUMN "extrinsic_id"`)
        await db.query(`ALTER TABLE "transfer" DROP COLUMN "extrinsic_hash"`)
        await db.query(`ALTER TABLE "transfer" DROP COLUMN "signed_data"`)
    }
}
