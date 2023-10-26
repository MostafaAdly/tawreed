import mongoose from "mongoose";
export default class MongoDB {
    private data: any;
    constructor(data: any) {
        this.data = data;
    }
    async connect() {
        if (!process.env.MONGODB_CONNECTION_STRING) return;
        mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
            this.data.utils.print("Connected to MongoDB.");
        }).catch(() => this.data.utils.print("Failed to connect to MongoDB"));
    }
    disconnect = () => mongoose.disconnect();
}