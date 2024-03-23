import Login from "./Pages/Authentication/Login";
import User from '../Instances/User';
import Home from "./Pages/Personas/Customer/Home/Home";
import Server from "./Server";
import PersonaSelector from "./Pages/Personas/Selector/PersonaSelector";

export default class SessionHandler {
    private data: any;
    constructor(data: any) {
        this.data = data;
    }

    public runMiddleware(req: any, res: any, next: any) {
        // console.log(req.method, req.url, this.isSessionRegistered(req), this.isAuthURL(req.url))
        if (req.url.startsWith('/_next')) {
            next();
        } else if (req.method.toLowerCase() == 'get' && !this.isSessionRegistered(req) && !this.isAuthURL(req.url)) {
            res.redirect(Login.base_url);
            // console.log("------")
        } else if (this.isSessionRegistered(req) && this.isAuthURL(req.url)) {
            res.redirect(PersonaSelector.base_url);
            // console.log("----=========-")
        } else
            next();
    }

    public isAuthURL(url: string) {
        return url != null && [Login.base_url, Server.api_base_url].filter(auth => url.toLowerCase().startsWith(auth.toLowerCase())).length != 0
    }

    public isSessionRegistered(req: any): boolean {

        return req?.session?.auth == true;
    }
    // =========

    removeSessionIfExists(req: any) {
        if (this.isSessionRegistered(req))
            req.session.destroy(() => { });
    }

    validateSessionWithUser(req: any, user: User) {
        if (!req?.session || !user || this.isSessionRegistered(req)) return;
        req.session.auth = true;
        req.session.user = user;
    }
}