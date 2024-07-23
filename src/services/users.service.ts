import User from "src/database/models/user.model";
import BaseService from "./base.service";
import Supplier from "src/database/models/supplier.model";
import Client from "src/database/models/client.model";
import Helpers from "src/utils/helpers";

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

    static createClient = async (data: User): Promise<(User | null)> => {
        if (!data) return null;
        return await UsersService.createUser(Client, data);
    }

    static createSupplier = async (data: User): Promise<(User | null)> => {
        if (!data) return null;
        return await UsersService.createUser(Supplier, data);
    }

    private static createUser = async (base, data): Promise<(User | null)> => {
        console.log(data)
        if (!data) return null;
        const user = new base();
        Object.assign(user,
            {
                companyName: data.companyName,
                username: data.username.toLowerCase(),
                email: data.email.toLowerCase(),
                hashed_password: await Helpers.hash(data.password),
                phone: data.phone,
                company: {
                    address: data.companyAddress,
                    size: data.companySize,
                    notes: data.notes,
                    industry: data.industry
                },
                metadata: {},
            }
        );
        try {
            return await user.save();
        } catch (error) {
            console.error(error)
            return null;
        }
    }
}