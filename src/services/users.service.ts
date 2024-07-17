import User from "src/database/models/user.model";
import BaseService from "./base.service";

export default class UsersService extends BaseService {

    static getUsers = async ({ email = '', phone, username, type }: { email?: string, phone?: string, username?: string, type?: string }) => {
        return await User.find({ where: [{ email: email.toLowerCase() }, { phone }, { username }, { type }] });
    }

    static getUserByEmail = async (email: string) => {
        if (!email) return null;
        return await User.findOne({ where: { email: email.toLowerCase() } });
    }

    static createUser = async (data: User) => {
        if (!data) return null;
        return User.create(data);
    }
}