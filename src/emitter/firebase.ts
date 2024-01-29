import admin from 'firebase-admin';
import { Reference } from "firebase-admin/database";
import { NewBlockData } from "../interfaces/interfaces";
import { Emitter, EmitterType } from './emitter';

export class FirebaseDB extends Emitter {
    // Use the same ref to store only the latest block
    private dbRef: Reference;

    constructor() {
        super(EmitterType.FirebaseDB);

        const projectId = process.env.FIREBASE_PROJECT_ID;
        const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
        const privateKey = process.env.FIREBASE_PK;
        const databaseURL = process.env.FIREBASE_DB_URL;

        if (!projectId) throw new Error('Firebase project ID not set in environment');
        if (!clientEmail) throw new Error('Firebase client email not set in environment');
        if (!privateKey) throw new Error('Firebase private key not set in environment');
        if (!databaseURL) throw new Error('Firebase DB not set in environment');

        const firebasePk = Buffer.from(privateKey, 'base64').toString('ascii');

        admin.initializeApp({ 
            credential: admin.credential.cert({
                projectId,
                clientEmail,
                privateKey: firebasePk
            }),
            databaseURL
        });

        const db = admin.database();
        this.dbRef = db.ref(this.network);
    }

    protected sendNotification(data: NewBlockData) {
        const { blockHeight, ...blockData } = data;
        this.dbRef.set({ [blockHeight]: blockData });
    }
}
