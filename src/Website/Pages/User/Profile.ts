
import mongoose from "mongoose";
import Page from "../Page";
import Entity from "../../../Instances/Entity";

export default class Profile extends Page {
    private data: any;
    public static base_url: string = "/profile";
    constructor(data: any, base_url?: string) {
        super(base_url || Profile.base_url)
        this.data = data;
        this.run();
    }

    private run() {

        // ALL SUPPLIERS OF A DEPARTMENT
        this.router.get('/', async (req: any, res: any) => {
            const user = req.session.user;
            const entity = await mongoose.models.Entity.findOne({ _id: user.entity }).populate('roles');
            const usersCount = (await mongoose.models.User.find({ entity: entity._id }).exec()).length;
            if (!entity) {
                // TODO: HANDLE ENTITY IF NULL
                return;
            }
            this.data.server.next.render(req, res, '/User/ProfilePage', {
                data: JSON.stringify({
                    user, entity, usersCount
                })
            });
        });
    }
}