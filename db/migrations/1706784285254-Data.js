module.exports = class Data1706784285254 {
    name = 'Data1706784285254'

    async up(db) {
        // *************************************************************************************************************
        //        Script inserted manually. Modifies the foreign key constraint on the verified_contract table to delete
        //        the verified contract when the contract is deleted.
        // *************************************************************************************************************

        // condition by anukul to avoid errors if the constraint does not exist
        await db.query(`DO $$ BEGIN IF EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name='FK_70c992c058f4f82d658a2cd899c' AND table_name='verified_contract') THEN ALTER TABLE "verified_contract" DROP CONSTRAINT "FK_70c992c058f4f82d658a2cd899c"; END IF; END $$;`);

        await db.query(`ALTER TABLE "verified_contract" ADD CONSTRAINT "FK_70c992c058f4f82d658a2cd899c" FOREIGN KEY ("contract_id") REFERENCES "contract"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
}
