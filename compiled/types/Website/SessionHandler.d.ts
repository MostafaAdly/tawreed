import User from '../Instances/User';
export default class SessionHandler {
    private data;
    constructor(data: any);
    runMiddleware(req: any, res: any, next: any): Promise<void>;
    checkForPersonaAccess: (req: any) => Promise<boolean>;
    isAuthURL(url: string): boolean;
    isSessionRegistered(req: any): boolean;
    removeSessionIfExists(req: any): void;
    validateSessionWithUser(req: any, user: User): void;
}
