import mongoose from 'mongoose';
import { UserInterface } from '../interfaces/UserInterface.js';

const UserSchema = new mongoose.Schema<UserInterface>({
    user_name: {type: String, required: true, unique: true},
    user_password: {type: String, required: true}
});

export const UserModel = mongoose.model<UserInterface>('UserModel', UserSchema);
