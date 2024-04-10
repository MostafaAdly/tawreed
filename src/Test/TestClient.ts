import mongoose from "mongoose";
import User from "../Instances/User";
import ModelManager from "../Database/ModelManager";
import { Model } from 'mongoose';
import Utils from '../Utils'
import { ObjectId } from "mongodb";

export default class TestClient {

    private data: any;
    constructor(data: any) {
        this.data = data;
    }

    public run = async () => {
        // await this.testOnUser()
    }

    private testOnUser = async () => { // test user : UID21ea3664
        // const user = new User("Test",
        //     { username: "test", password: "test" }, "test", "test");
        // await user.save();
        // const user = new User("UID21ea3664");
        // await user.load(true, false);
        // const user = new User("Test",
        //     { username: "test", password: "test" }, "test", "test");
        // user.asd = new mongoose.Types.ObjectId();
        // await user.save();
        // const user = await User.schema().findOne({ id: "UID21ea3664" });
        // console.log(user["id"])

        // const entity = await mongoose.models.Entity.create({
        //     _id: new ObjectId(),
        //     details: {
        //         displayName: "Mostafa Adly",
        //         logo: "logo",
        //         banner: "banner",
        //         description: "description"
        //     },
        //     personas: {
        //         supplier: {
        //             products: []
        //         }
        //     },
        //     departments: [],
        //     roles: [],
        //     categories: [],
        // });

        // const newUser = await mongoose.models.User.create({
        //     displayName: "Mostafa Adly",
        //     credentials: {
        //         username: "Mostafa Adly Ibrahim Amar",
        //         password: "123123"
        //     },
        //     entity: entity._id,
        //     role: new ObjectId()
        // });
        // const user = await mongoose.models.User
        //     .findOne({ displayName: "Mostafa Adly" })
        //     .populate('entity')
        // console.log(user)
    }
}