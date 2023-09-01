import { UpdateResult } from 'typeorm';
import { User } from './UserEntity';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

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
	// Email 검색
	getUserByEmail: async (email: string): Promise<User | null> => {
		return await User.findOne({ where: { email } });
	},
	// Nickname 검색
	getUserByNickname: async (nickname: string): Promise<User | null> => {
		return await User.findOne({ where: { nickname } });
	},
	// id 검색
	getUserById: async (id: number): Promise<User | null> => {
		return await User.findOne({ where: { id } });
	},
	// 회원 가입
	createUser: async (
		email: string,
		password: string,
		nickname: string
	): Promise<User> => {
		try {
			const isDuplicateEmail: boolean = await userService.isDuplicateEmail(
				email
			);
			const isDuplicateNickname: boolean =
				await userService.isDuplicateNickname(nickname);

			if (isDuplicateEmail) {
				throw new Error('이미 사용 중인 이메일 입니다.');
			}

			if (isDuplicateNickname) {
				throw new Error('이미 사용 중인 닉네임입니다.');
			}

			const hashedPassword: string = await bcrypt.hash(password, 10);
			const newUser: User = new User();

			newUser.email = email;
			newUser.password = hashedPassword;
			newUser.nickname = nickname;

			return User.save(newUser);
		} catch (error) {
			throw new Error(error.message);
		}
	},
	// 토큰 생성
	createToken: async (user: User): Promise<string> => {
		try {
			const token: string = jwt.sign(
				{ userId: user.id },
				process.env.SECRET_KEY as string,
				{ expiresIn: '1d' }
			);

			return token;
		} catch (error) {
			throw new Error(error.message);
		}
	},
	// 로그인
	login: async (email: string, password: string): Promise<string> => {
		try {
			const user = await userService.getUserByEmail(email);

			if (!user) {
				throw new Error('입력하신 이메일은 회원가입되어 있지 않습니다.');
			}

			const isValidPassword = bcrypt.compareSync(
				password,
				String(user.password).trim()
			);

			if (!isValidPassword) {
				throw new Error('비밀번호가 일치하지 않습니다.');
			}

			const token = await userService.createToken(user);
			if (!token) {
				throw new Error('토큰이 생성되지 않습니다.');
			}

			return token;
		} catch (error) {
			throw new Error(error.message);
		}
	},
	// 회원 정보 수정
	updateUser: async (
		userId: number,
		nickname: string,
		password: string,
		updatePassword: string
	): Promise<UpdateResult> => {
		try {
			const user = await userService.getUserById(userId);

			if (!user) {
				throw new Error('사용자를 찾을 수 없습니다.');
			}

			const isValidPassword = await bcrypt.compare(password, user.password);
			if (!isValidPassword) {
				throw new Error(
					'비밀번호가 일치하지 않아 회원정보를 업데이트할 수 없습니다.'
				);
			}

			if (user.nickname !== nickname) {
				const isDuplicateNickname = await userService.isDuplicateNickname(
					nickname
				);

				if (isDuplicateNickname) {
					throw new Error('사용 중인 닉네임입니다.');
				}
			}
			const hashedPassword: string = await bcrypt.hash(updatePassword, 10);

			user.nickname = nickname;
			user.password = hashedPassword;

			return User.update({ id: userId }, { nickname, password });
		} catch (error) {
			throw new Error(error.message);
		}
	},
	// 회원 탈퇴
	deleteUser: async (email: string): Promise<UpdateResult> => {
		try {
			return await User.update({ email }, { isDeleted: true });
		} catch (error) {
			throw new Error(error.message);
		}
	},
};
