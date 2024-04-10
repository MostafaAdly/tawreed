import Department from "../../../../../Instances/Department";
import Page from "../../../Page";
import mongoose from "mongoose";

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
        this.router.get('/:departmentId', async (req: any, res: any) => {
            const user = req.session.user;
            const department = await new Department().load({ departmentId: req.params.departmentId });
            if (!department) {
                //TODO: HANDLE DEPARTMENT IF NULL
                return;
            }
            const entities = await mongoose.models.Entity.find({ "departments": { $elemMatch: { $eq: department._id } } });
            this.data.server.next.render(req, res, '/Customer/Department/DepartmentPage', { data: JSON.stringify({ department, entities, user }) });
        })
    }
}