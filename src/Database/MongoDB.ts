import mongoose from "mongoose";
import departments from '../DefaultData/departments.json'
import Department from '../Instances/Department';
import User from "../Instances/User";
export default class MongoDB {
    private data: any;
    constructor(data: any) {
        this.data = data;
    }
    connect = async () => {
        if (!process.env.MONGODB_CONNECTION_STRING) return;
        mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(() => {
            this.data.utils.print("Connected to MongoDB.");
        }).catch(() => this.data.utils.print("Failed to connect to MongoDB"));
    }
    disconnect = () => mongoose.disconnect();
    import_departments_intoMySQL = async () => {
        for (var departmentData of departments) {
            await new Department(departmentData).save();
        };
    }
    deleteAllDepartments = async () => {
        await Department.schema().deleteMany({});
    }
    deleteAllUsers = async () => {
        await User.schema().deleteMany({});
    }
}