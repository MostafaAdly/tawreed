
import Page from "../Page";

export default class AdminDashboard extends Page {
    private data: any;
    public static base_url: string = "/a";
    constructor(data: any, base_url?: string) {
        super(base_url || AdminDashboard.base_url)
        this.data = data;
        this.run();
    }

    private run() {
        // ADMIN PANEL FOR USER
        this.router.get('/', async (req: any, res: any) => {
            const user = req.session.user;
            if (!user.admin)
                return res.status(301).redirect("/");
            this.data.server.next.render(req, res, '/Admin/Dashboard/AdminDashboardPage', {
                data: JSON.stringify({
                    user
                })
            });
        });
    }
}