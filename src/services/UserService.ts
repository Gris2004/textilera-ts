import { UserModel } from '../models/UserModel.js';
import {UserInterface} from '../interfaces/UserInterface.js';

export default class UserService{
    async createUser(userData: UserInterface): Promise<UserInterface | null>{
        try{
            return await UserModel.create(userData);
        } catch (e: unknown) {
            if(e instanceof Error)
                console.error(e.message);

            throw e;
        }
    }

    async checkUser(userData: UserInterface): Promise<UserInterface>{
        try{
            //find user by name
            const user = await UserModel.findOne({user_name: userData.user_name});

            //check if doesn't user exists
            if(!user) throw new Error('el usuario no existe');
            
            //compare passwords with user and userData
            if(user.user_password !== userData.user_password)
                throw new Error("Usuario y contraseña inválidos");

            return user;

        } catch (e: unknown) {
            if(e instanceof Error)
                console.error(e.message);

            throw e;
        }
    }
}
