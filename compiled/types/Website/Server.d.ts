import { Multer } from 'multer';
import { NextServer } from 'next/dist/server/next';
export default class Server {
    private data;
    private port;
    private ttl;
    private sessionHandler;
    private development;
    next: NextServer;
    static api_base_url: string;
    app: any;
    multer: Multer;
    constructor(data: any);
    initialize(): void;
    load_Middleware(): void;
    load_Late_Middleware(): void;
    load(): void;
    private load_pages;
    private load_apis;
    listen: () => any;
}
