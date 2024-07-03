import User from 'src/database/models/user.model';
import BaseController from '../base.controller';
import bcrypt from 'bcrypt';

export default class AuthenticationController extends BaseController {

    checkPassword = (user: User, password: string) => {
        return bcrypt.compare(password, user.hashed_password);
    }
}