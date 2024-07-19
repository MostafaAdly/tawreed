import User from "src/database/models/user.model";
import BaseService from "./base.service";

export default class UsersService extends BaseService {

    static getUsers = async ({ email = '', phone, username, type }: { email?: string, phone?: string, username?: string, type?: string }) => {
        return await User.find({ where: [{ email: email.toLowerCase() }, { phone }, { username }, { type }] });
    }

    static getUserByEmail = async (email: string): Promise<(User | null)> => {
        if (!email) return null;
        try {
            return await User.findOne({ where: { email: email.toLowerCase() } });
        } catch (error) {
            return null;
        }
    }

    static getUserById = async (id: string, secured: boolean = true): Promise<(User | null)> => {
        if (!id) return null;
        try {
            const user = await User.findOne({ where: { id } });
            if (user && secured)
                delete user.hashed_password;
            return user;
        } catch (error) {
            return null;
        }
    }

    static createUser = async (data: User): Promise<(User | null)> => {
        if (!data) return null;
        try {
            return User.create(data);
        } catch (error) {
            return null;
        }
    }
}