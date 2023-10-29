import Department from "../../../Instances/Department";
import Page from "../Page";

export default class Departments extends Page {
    private data: any;
    public static base_url: string = "/departments";
    constructor(data: any, base_url?: string) {
        super(base_url || Departments.base_url)
        this.data = data;
        this.run();
    }

    private run() {
        this.router.get('/', async (req: any, res) => {
            const departments = await Department.schema().find({});
            const user = req.session.user;
            res.render('Home/departments', { project_name: this.data.project_name, departments, user });
        });
    }
}