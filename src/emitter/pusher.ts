import PusherClient from "pusher";
import { NewBlockData } from "../interfaces/interfaces";
import { Emitter, EmitterType } from "./emitter";

export class Pusher extends Emitter {
    private client: PusherClient;
    private channel: string;
    private event: string;
    
    constructor() {
        super(EmitterType.Pusher);

        const channel = process.env.PUSHER_CHANNEL;
        const event = process.env.PUSHER_EVENT;
        const appId = process.env.PUSHER_APP_ID;
        const key = process.env.PUSHER_KEY;
        const secret = process.env.PUSHER_SECRET;

        if (!channel) throw new Error('Pusher channel not set in environment');
        if (!event) throw new Error('Pusher event not set in environment');
        if (!appId) throw new Error('Pusher app ID not set in environment');
        if (!key) throw new Error('Pusher key not set in environment');
        if (!secret) throw new Error('Pusher secret not set in environment');

        this.channel = channel;
        this.event = event;
        this.client = new PusherClient({
            appId,
            key,
            secret,
            cluster: process.env.PUSHER_CLUSTER || "eu",
            useTLS: true
        });

    }

    protected sendNotification(data: NewBlockData) {
        this.client.trigger(this.channel, this.event, data);
    }
}
