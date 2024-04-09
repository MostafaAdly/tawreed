
import { createClient } from 'redis';

export default class Redis {
    private data: any;

    constructor(data: any) {
        this.data = data;
    }

    connect = async () => {
        const client = await createClient()
            .on('error', err => console.log('Redis Client Error', err))
            .connect();

        await client.set('key', 'value');
        const value = await client.get('key');
        await client.disconnect();
    }
}
