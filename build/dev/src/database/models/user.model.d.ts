import BaseModel from "./base.model";
export default class User extends BaseModel {
    username: string;
    hashed_password: string;
}
