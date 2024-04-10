"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class TestClient {
    constructor(data) {
        this.run = () => __awaiter(this, void 0, void 0, function* () {
            // await this.testOnUser()
        });
        this.testOnUser = () => __awaiter(this, void 0, void 0, function* () {
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
        });
        this.data = data;
    }
}
exports.default = TestClient;
