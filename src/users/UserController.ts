import { Request, Response } from 'express';
import { userService } from './UserService';
import { IUser } from './UserSchema';
import bcrypt from 'bcrypt';

export const userController = {
	registeUser: async (req: Request, res: Response): Promise<Response> => {
		const userData: IUser = req.body;
		const { email, password, nickname } = userData;
		const validatorEmail = await userService.getUserByEmail(email);
		const validatorNickname = await userService.getUserByNickname(nickname);

		try {
			if (validatorEmail) {
				return res
					.status(409)
					.json({ message: '이미 사용 중인 이메일 입니다.' });
			} else if (validatorNickname) {
				return res
					.status(409)
					.json({ message: '이미 사용 중인 닉네임 입니다.' });
			} else if (!userData) {
				return res.status(400).json({ message: '누락된 값이 있습니다.' });
			}

			await userService.createUser(email, nickname, password);
			return res.status(201).json({ message: '가입 완료' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	getUserInformation: async (
		req: Request,
		res: Response
	): Promise<Response> => {
		try {
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},

	userLogin: async (req: Request, res: Response): Promise<Response> => {
		try {
			const { email, password }: IUser = req.body;
			const user = await userService.getUserByEmail(email);

			if (!user) {
				return res
					.status(400)
					.json({ message: '입력하신 이메일은 회원가입되어 있지 않습니다.' });
			}

			const isValidPassword = await bcrypt.compare(password, user.password);

			if (!isValidPassword) {
				return res
					.status(401)
					.json({ message: '비밀번호가 일치하지 않습니다.' });
			}

			const token = await userService.createToken(user);

			if (!token) {
				return res
					.status(400)
					.json({ message: '로그인 토큰이 생성되지 않습니다.' });
			}

			return res.status(201).json({ message: '로그인에 성공했습니다.', token });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	updateProfile: async (req: Request, res: Response): Promise<Response> => {
		try {
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 만들고 나서 생각한건데, validatorEmail을 따로 구현할 필요가 있나 싶음. 이미 회원가입때 사용했고 이 정보는 수정이 불가능하니 의미가 없지 않나 싶은데...
	validatorEmail: async (req: Request, res: Response): Promise<Response> => {
		try {
			const { email }: IUser = req.body;
			const validatorEmail = await userService.getUserByEmail(email);
			if (validatorEmail) {
				return res
					.status(400)
					.json({ message: '이미 사용 중인 이메일입니다.' });
			} else
				return res.status(200).json({ message: '사용 가능한 이메일입니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	validatorNickname: async (req: Request, res: Response): Promise<Response> => {
		try {
			const { nickname }: IUser = req.body;
			const validatorNickname = await userService.getUserByNickname(nickname);
			if (validatorNickname) {
				return res
					.status(400)
					.json({ message: '이미 사용 중인 닉네임입니다.' });
			} else
				return res.status(200).json({ message: '사용 가능한 닉네임입니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	withdrawUser: async (req: Request, res: Response): Promise<Response> => {
		try {
			const { _id }: IUser = req.body;
			await userService.deleteUser(_id);

			res.status(200).json({ message: '회원탈퇴 성공' });
		} catch (error) {
			if (error.message === '회원 탈퇴 실패') {
				return res
					.status(400)
					.json({ message: '토큰이 일치하지 않아 회원탈퇴 실패' });
			}
			return res.status(500).json({ error: error.message });
		}
	},
};
