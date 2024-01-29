import { NewBlockData } from "../interfaces/interfaces";

export enum EmitterType {
    FirebaseDB = 'firebase-db',
    EmitterIO = 'emitter-io',
    Pusher = 'pusher',
}

export abstract class Emitter {
    protected type: EmitterType;
    protected network: string;

    constructor(type: EmitterType) {
        if (!process.env.NETWORK) throw new Error('Network not set in environment');
        this.network = process.env.NETWORK.toLowerCase();
        this.type = type;
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
            this.sendNotification(data);
        } catch (e) {
            console.error(`Emitter ${this.type} error for block ${data.blockId}`);
        }
    }

    protected abstract sendNotification(data: NewBlockData): void;
}
