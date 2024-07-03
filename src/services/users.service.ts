import User from "src/database/models/user.model";
import BaseService from "./base.service";

export default class UsersService extends BaseService {

    static getUserByEmail = async (email: string) => {
        return await User.findOne({ where: { email } });
    }

    static createUser = async (data: User) => {
        return User.create(data);
    }
}