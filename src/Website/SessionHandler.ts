import Login from "./Pages/Authentication/Login";
import User from '../Instances/User';
import Server from "./Server";
import Entity from "../Instances/Entity";
import Utils from "../Utils";

export default class SessionHandler {
    private data: any;

    constructor(data: any) {
        this.data = data;
    }

    public async runMiddleware(req: any, res: any, next: any) {
        if (req.url.startsWith('/_next') || req.url.startsWith(Server.api_base_url)) {
            next();
        }
        else if (req.method.toLowerCase() == 'get' && !this.isSessionRegistered(req) && !this.isAuthURL(req.url)) {
            res.redirect(Login.base_url);
        }
        else if (this.isSessionRegistered(req) && this.isAuthURL(req.url)) {
            res.redirect('/');
        }
        else if (this.isSessionRegistered(req) && !(await this.checkForPersonaAccess(req))) {
            res.redirect("/");
        }
        else {
            next();
        }
    }

    public checkForPersonaAccess = async (req: any): Promise<boolean> => {
        const user = req.session.user;
        if (user) {
            const entity = await new Entity({}).load(user.entity);
            if (!entity
                || !entity.personas.customer && req.url.startsWith("/c")
                || !entity.personas.supplier && req.url.startsWith("/s"))
                return false;
            return true;
        }
        return false;
    }

    public isAuthURL(url: string) {
        return url != null && [Login.base_url, Server.api_base_url].filter(auth => url.toLowerCase().startsWith(auth.toLowerCase())).length != 0
    }

    public isSessionRegistered(req: any): boolean {

        return req?.session?.auth == true;
    }

    // ======================================================
    removeSessionIfExists(req: any) {
        if (this.isSessionRegistered(req)) {
            req.session.destroy(() => { });
            // this.data.
        }
    }

    validateSessionWithUser(req: any, user: User) {
        if (!req?.session || !user || this.isSessionRegistered(req)) return;
        req.session.auth = true;
        req.session.user = user;
        this.data.redis.set("token:" + user.id, Utils.createToken());
    }
}