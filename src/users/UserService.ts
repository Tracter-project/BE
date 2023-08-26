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
			// const token: string = await userService.createToken(token);
			if (isDuplicateEmail) {
				throw new Error('createUser: 이미 사용 중인 이메일 입니다.');
			}
			if (isDuplicateNickname) {
				throw new Error('createUser: 이미 사용 중인 닉네임입니다.');
			}
			const hashedPassword: string = await bcrypt.hash(password, 10);
			const newUser: User = new User();
			newUser.email = email;
			newUser.password = hashedPassword;
			newUser.nickname = nickname;
			// newUser.token = token;
			return newUser.save();
		} catch (error) {
			throw new Error('createUser: 회원가입에 실패했습니다.');
		}
	},
	// 토큰 생성
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
	// 로그인
	login: async (email: string, password: string): Promise<string> => {
		const user = await userService.getUserByEmail(email);

		if (!user) {
			throw new Error('login: 입력하신 이메일은 회원가입되어 있지 않습니다.');
		}
		const hashPasswrod = await bcrypt.hash(password, 10);
		const isValidPassword = await bcrypt.compareSync(
			password,
			String(user.password).trim()
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
	// Email 검색
	getUserByEmail: async (email: string): Promise<User | null> => {
		return await User.findOne({ where: { email } });
	},
	// Nickname 검색
	getUserByNickname: async (nickname: string): Promise<User | null> => {
		return await User.findOne({ where: { nickname } });
	},
	// 회원 정보 수정
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
			const isValidPassword = await bcrypt.compare(password, user.password);
			if (!isValidPassword) {
				throw new Error(
					'updateUser: 비밀번호가 일치하지 않아 회원정보를 업데이트할 수 없습니다.'
				);
			}

			if (user.nickname !== nickname) {
				const isDuplicateNickname = await userService.isDuplicateNickname(
					nickname
				);
				if (isDuplicateNickname) {
					throw new Error('updateUser: 사용 중인 닉네임입니다.');
				}
			}
			user.nickname = nickname;
			const hashedPassword: string = await bcrypt.hash(updatePassword, 10);

			user.password = hashedPassword;

			return User.update(
				{ email },
				{ nickname: user.nickname, password: user.password }
			);
		} catch (error) {
			throw new Error('updateUser: 회원 정보 수정에 실패했습니다.');
		}
	},
	// 회원 탈퇴
	deleteUser: async (email: string): Promise<UpdateResult> => {
		try {
			return await User.update({ email }, { isDeleted: true });
		} catch (error) {
			throw new Error('deleteUser: 회원탈퇴에 실패했습니다.');
		}
	},

	// 장소_좋아요
	// likePlace: async (email: string): Promise<void> => {
	// 	try {
	// 		const user = await userService.getUserByEmail(email);

	// 		if (!user) {
	// 			throw new Error('likePlace: 사용자를 찾을 수 없습니다.');
	// 		}

	// 		const likedPlaceIds = user.likedPlaces.map(place => place.id);
	// 			throw new Error('likePlace: 이미 좋아요가 되어 있는 사용자입니다.');
	// 		}
	// 	} catch (error) {
	// 		throw new Error('likePlace: 장소에 좋아요가 실패했습니다.');
	// 	}
	// },
	// // 장소_좋아요 취소
	// unlikePlace: async (email: string): Promise<void> => {
	// 	try {
	// 	} catch (error) {
	// 		throw new Error('unlikePlace: 장소에 좋아요 취소가 실패했습니다.');
	// 	}
	// },
	// // 글_좋아요
	// likePost: async (email: string): Promise<void> => {
	// 	try {
	// 	} catch (error) {
	// 		throw new Error('likePost: 글의 좋아요가 실패했습니다.');
	// 	}
	// },
	// // 글_좋아요 취소
	// unlikePost: async (email: string): Promise<void> => {
	// 	try {
	// 	} catch (error) {
	// 		throw new Error('unlikePost: 글의 좋아요 취소가 실패했습니다.');
	// 	}
	// },
};
