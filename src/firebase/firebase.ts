import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, DatabaseReference } from "firebase/database";
import { NewBlockData } from "../interfaces/interfaces";
import { ctx } from "../processor";

export class FirebaseDB {
    // Use the same ref to store only the latest block
    private dbRef: DatabaseReference;

    constructor() {
        if (!process.env.NETWORK) throw new Error('Network not set in environment');
        if (!process.env.FIREBASE_CONFIG) throw new Error('Firebase config not found');

        const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);
        this.dbRef = ref(db, process.env.NETWORK);
    }

    public notifyBlock(data: NewBlockData) {
        if (!data.updatedContracts.length 
            && !data.updatedAccounts.REEF20Transfers.length 
            && !data.updatedAccounts.REEF721Transfers.length 
            && !data.updatedAccounts.REEF1155Transfers.length 
            && !data.updatedAccounts.boundEvm.length
        ) {
            return;
        }

        try {
            const { blockHeight, ...blockData } = data;
            set(this.dbRef, { [blockHeight]: blockData });
        } catch (e) {
            ctx.log.error(`Firebase DB notification error for block ${data.blockId}`);
        }
    }
}
