import {File, Storage} from '@google-cloud/storage';
import {PubSub} from '@google-cloud/pubsub';

export class GcfCommon {
    static async publish(event, context, data) {
        const topic = await this.getTopic(event, context);
        console.log('publish:', topic.name, data);
        await topic.publishJSON(data);
    }

    static async getTopic(event, context) {
        const pubSub = new PubSub();
        let topicName: string;

        if (context?.resource?.type === 'storage#object') {
            const storage = new Storage();
            const file: File = storage.bucket(event.bucket).file(event.name);
            const [meta] = await file.getMetadata();
            topicName = meta?.metadata?.topic;
            console.log('topic:', topicName);
        }

        return pubSub.topic(topicName);
    }

    static async delay(s: number = 540) {
        return new Promise<undefined>((resolve, reject) => {
            setTimeout(() => {
                reject(new Error(`${s} seconds timeout exceeded`));
            }, s * 1000);
        });
    }
}
