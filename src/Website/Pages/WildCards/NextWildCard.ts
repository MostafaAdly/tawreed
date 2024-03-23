// ================================================================= [ Libraries ]
import Page from '../Page';

// ================================================================= [ Authentication - Login ]
export default class WildCard extends Page {
    public static base_url: string = "";
    // ================ - PRIVATE VARIABLES - ================
    private data: any;
    constructor(data: any) {
        super(WildCard.base_url);
        this.data = data;
        this.run();
    }
    private run() {
        const handler = this.data.server.next.getRequestHandler();
        this.router.get('*', (req: any, res: any) => handler(req, res))
    }
}