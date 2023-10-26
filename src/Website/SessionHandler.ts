import Login from "./Pages/Authentication/Login";
import Register from "./Pages/Authentication/Register";
import User from '../Instances/User';
import Home from "./Pages/Home/Home";

export default class SessionHandler {
    private data: any;
    constructor(data: any) {
        this.data = data;
    }

    public runMiddleware(req: any, res: any, next: any) {
        if (req.method.toLowerCase() == 'get' && !this.isSessionRegistered(req) && !this.isAuthURL(req.url)) {
            res.redirect(Login.base_url);
        } else if (this.isSessionRegistered(req) && this.isAuthURL(req.url)) {
            res.redirect(Home.base_url);
        } else
            next();
    }

    public isAuthURL(url: string) {
        return url != null && [Login.base_url, Register.base_url].filter(auth => url.toLowerCase().startsWith(auth.toLowerCase())).length != 0
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
        req.session.user = { id: user.id, email: user.credentials.email }
    }
}