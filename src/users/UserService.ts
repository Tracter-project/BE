// import User, { IUser } from './UserSchema';
import { User } from './UserEntity';
import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcrypt';
import dotenv from 'dotenv';
import { UpdateResult } from 'typeorm';

dotenv.config();

export const userService = {
	// Email 중복 검사
	isDuplicateEmail: async (email: string): Promise<boolean> => {
		return (await User.findOne({ where: { email } })) ? true : false;
	},

	// 닉네임 중복 검사
	isDuplicateNickname: async (nickname: string): Promise<boolean> => {
		return (await User.findOne({ where: { nickname } })) ? true : false;
	},

	// 회원가입
	createUser: async (
		email: string,
		password: string,
		nickname: string
	): Promise<User> => {
		console.log(1);
		try {
			const isDuplicateEmail: boolean = await userService.isDuplicateEmail(
				email
			);
			const isDuplicateNickname: boolean =
				await userService.isDuplicateNickname(nickname);
			console.log(2);
			// const token: string = await userService.createToken(token);
			if (isDuplicateEmail) {
				throw new Error('createUser: 이미 사용 중인 이메일 입니다.');
			}
			console.log(6);
			console.log(isDuplicateEmail);
			if (isDuplicateNickname) {
				console.log(7);
				throw new Error('createUser: 이미 사용 중인 닉네임입니다.');
			}
			console.log(3);
			const hashedPassword: string = await bcrypt.hash(password, 5);
			console.log(4);
			const newUser: User = new User();
			newUser.email = email;
			newUser.password = hashedPassword;
			newUser.nickname = nickname;
			// newUser.token = token;
			console.log(5);
			return newUser.save();
		} catch (error) {
			throw new Error('createUser: 회원가입에 실패했습니다.');
		}
	},

	// 토큰 생성하기
	createToken: async (user: User): Promise<string> => {
		try {
			if (typeof process.env.SECRET_KEY !== 'string') {
				throw new Error('createToken: SECRET_KEY가 설정되어 있지 않습니다.');
			}

			const token: string = jwt.sign(
				{ userId: user.id },
				process.env.SECRET_KEY,
				{
					// 토큰의 유효 기간 설정(1일)
					expiresIn: '1d',
				}
			);

			return token;
		} catch (error) {
			throw new Error('createToken: 토큰이 생성되지 않습니다.');
		}
	},

	//로그인
	login: async (email: string, password: string): Promise<string> => {
		const user = await userService.getUserByEmail(email);

		if (!user) {
			throw new Error('login: 입력하신 이메일은 회원가입되어 있지 않습니다.');
		}

		const isValidPassword = await bcrypt.compare(password, user.password);
		console.log(
			`isValidPassword: ${isValidPassword}, password: ${password}, user.password:${user.password}`
		);
		if (!isValidPassword) {
			throw new Error('login: 비밀번호가 일치하지 않습니다.');
		}

		const token = await userService.createToken(user);

		if (!token) {
			throw new Error('login: 토큰이 생성되지 않습니다.');
		}
		return token;
	},

	// Email 검색하기
	getUserByEmail: async (email: string): Promise<User | null> => {
		return await User.findOne({ where: { email } });
	},
	// Nickname 검색하기
	getUserByNickname: async (nickname: string): Promise<User | null> => {
		return await User.findOne({ where: { nickname } });
	},

	// 회원 정보 업데이트하기
	updateUser: async (
		email: string,
		nickname: string,
		password: string,
		updatePassword: string
	): Promise<UpdateResult> => {
		try {
			const user = await userService.getUserByEmail(email);

			if (!user) {
				throw new Error('updateUser: 사용자를 찾을 수 없습니다.');
			}
			console.log(password, user.password);
			const isValidPassword = await bcrypt.compare(password, user.password);
			// const isValidPassword = true;
			// 이럼 비밀번호가 틀릴경우 업데이트가 진행되지 않으려고 하는데 password를 2개를 받아야하나?
			if (!isValidPassword) {
				throw new Error(
					'updateUser: 비밀번호가 일치하지 않아 회원정보를 업데이트할 수 없습니다.'
				);
			}

			if (user.nickname !== nickname) {
				const isDuplicateNickname = await userService.getUserByNickname(
					nickname
				);

				if (isDuplicateNickname) {
					throw new Error('updateUser: 사용 중인 닉네임입니다.');
				}
			}

			user.nickname = nickname;

			const hashedPassword: string = await bcrypt.hash(updatePassword, 5);
			user.password = hashedPassword;

			return User.update(
				{ email },
				{ nickname: user.nickname, password: user.password }
			);
		} catch (error) {
			console.log(error);
			throw new Error('updateUser: 회원 정보 업데이트에 실패했습니다.');
		}
	},

	// 회원 탈퇴하기
	deleteUser: async (email: string): Promise<UpdateResult> => {
		try {
			return await User.update({ email }, { isDeleted: true });
		} catch (error) {
			throw new Error('deleteUser: 회원탈퇴에 실패했습니다.');
		}
	},
};
