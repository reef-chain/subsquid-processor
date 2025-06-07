module.exports = class Data1706784285254 {
    name = 'Data1706784285254'

    async up(db) {
        // *************************************************************************************************************
        //        Script inserted manually. Modifies the foreign key constraint on the verified_contract table to delete
        //        the verified contract when the contract is deleted.
        // *************************************************************************************************************
        await db.query(`ALTER TABLE "verified_contract" DROP CONSTRAINT "FK_70c992c058f4f82d658a2cd899c";`);
        await db.query(`ALTER TABLE "verified_contract" ADD CONSTRAINT "FK_70c992c058f4f82d658a2cd899c" FOREIGN KEY ("contract_id") REFERENCES "contract"("id") ON DELETE CASCADE ON UPDATE NO ACTION`)
    }
}
