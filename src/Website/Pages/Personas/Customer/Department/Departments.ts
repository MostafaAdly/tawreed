import Department from "../../../../../Instances/Department";
import Page from "../../../Page";
import Entity from "../../../../../Instances/Entity";

export default class Departments extends Page {
    private data: any;
    public static base_url: string = "/c/departments";
    constructor(data: any, base_url?: string) {
        super(base_url || Departments.base_url)
        this.data = data;
        this.run();
    }

    private run() {
        // ALL DEPARTMENTS
        this.router.get('/', async (req: any, res: any) => {
            return res.status(200).redirect('/home#departments');
        });
        // DEPARTMENT BY ID
        this.router.get('/:id', async (req: any, res: any) => {
            const user = req.session.user;
            const department = await Department.schema().findOne({ id: req.params.id })

            const entities = await Entity.schema().find({ "details.categories": { $elemMatch: { $eq: department.id } } });
            this.data.server.next.render(req, res, '/Customer/Department/DepartmentPage', { data: JSON.stringify({ department, entities, user }) });
        })
    }
}