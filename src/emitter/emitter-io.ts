import mqtt, { MqttClient } from "mqtt";
import { NewBlockData } from "../interfaces/interfaces";
import { Emitter, EmitterType } from "./emitter";

export class EmitterIO extends Emitter {
    private client: MqttClient;
    private topic: string;
    
    constructor() {
        super(EmitterType.EmitterIO);

        const url = process.env.EMITTER_IO_URL;
        const key = process.env.EMITTER_IO_KEY;
        if (!url) throw new Error('EmitterIO URL not set in environment');
        if (!key) throw new Error('EmitterIO key not set in environment');

        const channel = `reef-indexer/${this.network}`;
        const [protocol, hostAndPort] = url.split("://");
        const [host, port] = hostAndPort.split(":");
        const secure = protocol === "https";
        
        this.topic = `${key}/${channel}/?me=1`;
        const connectOptions = {
            host,
            port: parseInt(port),
            keepalive: 30,
            secure
        };

        var brokerUrl = `${secure ? "wss://" : "ws://"}${host}:${port}`;

        this.client = mqtt.connect(brokerUrl, connectOptions);

        this.client.on("connect", () =>
            console.log("EmitterIO: Connected")
        );

        this.client.on("close", () => {
            console.log("EmitterIO: Closed");
            this.client.reconnect();
        });

        this.client.on("offline", () =>
            console.log("EmitterIO: Offline")
        );

        this.client.on("error", error =>
            console.log("EmitterIO: Error", error)
        );

        this.client.on("message", (topic, msg, packet) => {
            console.log("EmitterIO: Message", topic, msg.toString());
        });
    }

    protected sendNotification(data: NewBlockData) {
        if (this.client.disconnected) {
            console.error(`Emitter IO disconnected for block ${data.blockId}`);
            return;
        }

        this.client.publish(this.topic, JSON.stringify(data));
    }
}
