module.exports = class TransferAccountHistoryIndexes1777374203000 {
    name = 'TransferAccountHistoryIndexes1777374203000'

    async up(db) {
        await db.query(`CREATE INDEX "IDX_transfer_to_id_block_height_desc" ON "transfer" ("to_id", "block_height" DESC)`)
        await db.query(`CREATE INDEX "IDX_transfer_from_id_block_height_desc" ON "transfer" ("from_id", "block_height" DESC)`)
    }

    async down(db) {
        await db.query(`DROP INDEX "public"."IDX_transfer_from_id_block_height_desc"`)
        await db.query(`DROP INDEX "public"."IDX_transfer_to_id_block_height_desc"`)
    }
}
