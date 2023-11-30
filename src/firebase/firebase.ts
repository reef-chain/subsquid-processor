import admin from 'firebase-admin';
import { Reference } from "firebase-admin/database";
import { NewBlockData } from "../interfaces/interfaces";

export class FirebaseDB {
    // Use the same ref to store only the latest block
    private dbRef: Reference;

    constructor() {
        if (!process.env.NETWORK) throw new Error('Network not set in environment');
        if (!process.env.FIREBASE_PROJECT_ID) throw new Error('Firebase project ID not set in environment');
        if (!process.env.FIREBASE_CLIENT_EMAIL) throw new Error('Firebase client email not set in environment');
        if (!process.env.FIREBASE_PK) throw new Error('Firebase private key not set in environment');
        if (!process.env.FIREBASE_DB_URL) throw new Error('Firebase DB not set in environment');

        const firebasePk = Buffer.from(process.env.FIREBASE_PK, 'base64').toString('ascii');

        admin.initializeApp({ 
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: firebasePk
            }),
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
            console.error(`Firebase DB notification error for block ${data.blockId}`);
        }
    }
}
