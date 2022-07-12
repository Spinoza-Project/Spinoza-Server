import bcrypt from "bcryptjs";
import { PostBaseResponseDto } from "../interfaces/common/PostBaseResponseDto";
import { UserCreateDto } from "../interfaces/user/UserCreateDto";
import { UserSignInDto } from "../interfaces/user/UserSignInDto";
import User from "../models/User";

const createUser = async (
    userCreateDto: UserCreateDto
): Promise<PostBaseResponseDto | null> => {
    try {
        const existUser = await User.findOne({
            email: userCreateDto.email,
        });
        if (existUser) return null;
    } catch (error) {
        console.log(error);
        throw error;
    }
    try {
        const user = new User({
            email: userCreateDto.email,
            password: userCreateDto.password,
            type: userCreateDto.type,
            profileImage:
                userCreateDto.type == "USER"
                    ? "https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/user.png"
                    : "https://sopt-bucket.s3.ap-northeast-2.amazonaws.com/farmer.png",
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(userCreateDto.password, salt);

        await user.save();

        const data = {
            _id: user.id,
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const signInUser = async (
    userSignInDto: UserSignInDto
): Promise<PostBaseResponseDto | null | number> => {
    try {
        const user = await User.findOne({
            email: userSignInDto.email,
        });
        if (!user) return null;

        const isMatch = await bcrypt.compare(
            userSignInDto.password,
            user.password
        );
        if (!isMatch) return 401;

        const data = {
            _id: user._id,
        };

        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const getUser = async (userId: string): Promise<string | number> => {
    try {
        const user = await User.findById(userId);
        if (user) return user.type;

        return 401;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default {
    createUser,
    signInUser,
    getUser,
};
