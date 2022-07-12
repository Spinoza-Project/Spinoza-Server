import mongoose from "mongoose";
import { UserInfo } from "../interfaces/user/UserInfo";

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        required: true,
    },
});

export default mongoose.model<UserInfo & mongoose.Document>("User", UserSchema);
