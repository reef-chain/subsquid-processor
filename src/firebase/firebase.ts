import admin from 'firebase-admin';
import { App, initializeApp } from 'firebase-admin/app';
import { getMessaging } from "firebase-admin/messaging";
import { PusherData } from '../interfaces/interfaces';
import { ctx } from '../processor';
import { PusherMessage } from '../model';

// Firebase Cloud Messaging
// let fcm: App;
let topic: string;

export const initFmc = () => {
    if (process.env.PUSHER_ENABLED !== 'true') return false;
    if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) throw new Error('GOOGLE_APPLICATION_CREDENTIALS not set');
    if (!process.env.FCM_TOPIC) throw new Error('FCM_TOPIC not set');

    topic = process.env.FCM_TOPIC;

    try {
        // fcm = initializeApp();
        initializeApp();
        return true;
    } catch (e) {
        console.error('FCM initialization error');
        return false;
    }
}

export const sendMessage = async (data: PusherData) => {

    if (!data.updatedContracts.length 
        && !data.updatedAccounts.REEF20Transfers.length 
        && !data.updatedAccounts.REEF721Transfers.length 
        && !data.updatedAccounts.REEF1155Transfers.length 
        && !data.updatedAccounts.boundEvm.length
    ) {
        return;
    }
    
    try {
        const response = await getMessaging().send({
            topic: topic,
            data: {
                blockHeight: data.blockHeight.toString(),
                blockId: data.blockId,
                blockHash: data.blockHash,
                updatedAccounts: JSON.stringify(data.updatedAccounts),
                updatedContracts: data.updatedContracts.join(',')
            }
        });
        console.log('Successfully sent message:', response);
    } catch (e) {
        ctx.log.error(`Pusher error: ${e}`);
        const messagesToDelete = await ctx.store.find(PusherMessage, { order: { id: 'DESC' }, skip: 2 });
        if (messagesToDelete.length) {
            await ctx.store.remove(messagesToDelete);
        }
        ctx.store.save(new PusherMessage({ id: data.blockId, data: JSON.stringify(data) })).then(() => {
            ctx.log.info(`Pusher message for block ${data.blockId} saved to database.`);
            getMessaging().send({
                topic: topic,
                data: {
                    blockHeight: data.blockHeight.toString(),
                    blockId: data.blockId,
                    blockHash: data.blockHash,
                    error: "true"
                }
            });
        });
    }
}
