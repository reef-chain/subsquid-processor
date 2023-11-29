import admin from 'firebase-admin';
import { Reference } from "firebase-admin/database";
import { NewBlockData } from "../interfaces/interfaces";
import { ctx } from "../processor";

export class FirebaseDB {
    // Use the same ref to store only the latest block
    private dbRef: Reference;

    constructor() {
        if (!process.env.NETWORK) throw new Error('Network not set in environment');
        if (!process.env.FIREBASE_SERVICE_ACCOUNT) throw new Error('Firebase service account not set in environment');
        if (!process.env.FIREBASE_DB_URL) throw new Error('Firebase DB not set in environment');

        admin.initializeApp({ 
            credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
            databaseURL: process.env.FIREBASE_DB_URL 
        });

        const db = admin.database();
        this.dbRef = db.ref(process.env.NETWORK);
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
            this.dbRef.set({ [blockHeight]: blockData });
        } catch (e) {
            ctx.log.error(`Firebase DB notification error for block ${data.blockId}`);
        }
    }
}
