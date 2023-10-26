// ====================================================== [ Libraries ]

import Global from "./Utils";
import Server from './Website/Server'


// ====================================================== [ Boot Loader ]
export default class BootLoader {
    private data: any;
    constructor(data: any) {
        this.data = data;
    }
    // =================== - Loading Methods - ===================
    load_Server() {
        const server = new Server(this.data);
        server.initialize();
        server.load_Middleware();
        server.load();
        server.listen();
        this.data.server = server;
    }
    load_GraphQl() {
    }
    async load_Database() {
    }
    load_utils = () => new Global(this.data).initialize();
}