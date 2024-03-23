import User from '../Instances/User';
export default class SessionHandler {
    private data;
    constructor(data: any);
    runMiddleware(req: any, res: any, next: any): void;
    isAuthURL(url: string): boolean;
    isSessionRegistered(req: any): boolean;
    removeSessionIfExists(req: any): void;
    validateSessionWithUser(req: any, user: User): void;
}
