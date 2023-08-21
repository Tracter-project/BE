import User, { IUser } from './UserSchema';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const userService = {
	createUser: async (
		email: string,
		password: string,
		nickname: string
	): Promise<IUser> => {
		try {
			const hashedPassword = await bcrypt.hash(password, 5);

			const newUser: IUser = new User({
				email,
				password: hashedPassword,
				nickname,
			});
			return newUser.save();
		} catch (error) {
			throw new Error('회원가입 실패');
		}
	},

	// 토큰 생성하기
	createToken: async (user: IUser): Promise<string> => {
		try {
			const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
				// 토큰의 유효 기간 설정(1일)
				expiresIn: '1d',
			});

			return token;
		} catch (error) {
			throw new Error('토큰 생성 실패');
		}
	},

	// Email 검색하기
	getUserByEmail: async (email: string): Promise<IUser> => {
		return User.findOne({ email });
	},
	// Nickname 검색하기
	getUserByNickname: async (nickname: string): Promise<IUser> => {
		return User.findOne({ nickname });
	},
	// 회원 탈퇴하기
	deleteUser: async (email: string): Promise<void> => {
		try {
			await User.updateOne({ email }, { isDeleted: true });
		} catch (error) {
			throw new Error('회원탈퇴 실패');
		}
	},
};
