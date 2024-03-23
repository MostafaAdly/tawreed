// ====================================================== [ Libraries ]

import Global from "./Utils";
import Server from './Website/Server'
import departments from './DefaultData/departments.json'

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
        this.data.server = server;
    }
    load_utils = () => new Global(this.data).initialize();
    load_departments = () => {
        this.data.departments = Object.keys(departments);
    }

}