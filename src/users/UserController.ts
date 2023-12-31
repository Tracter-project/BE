import { Request, Response } from 'express';
import { userService } from './UserService';
import { RegisteUserDTO, UpdateProfileDTO, UserLoginDTO } from './UserDTO';

export const userController = {
	// 회원 가입
	registeUser: async (req: Request, res: Response): Promise<Response> => {
		try {
			const { email, password, nickname }: RegisteUserDTO = req.body;

			if (!email || !password || !nickname) {
				return res.status(400).json({ message: '누락된 값이 있습니다.' });
			}

			await userService.createUser(email, password, nickname);

			return res.status(201).json({ message: '회원 가입이 완료되었습니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 로그인
	userLogin: async (req: Request, res: Response): Promise<Response> => {
		try {
			const { email, password }: UserLoginDTO = req.body;
			const token = await userService.login(email, password);

			return res.status(201).json({ message: '로그인에 성공했습니다.', token });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 이메일 중복 검사
	validatorEmail: async (req: Request, res: Response): Promise<Response> => {
		try {
			const { email } = req.params;
			const isDuplicateEmail = await userService.isDuplicateEmail(email);

			if (isDuplicateEmail) {
				return res
					.status(400)
					.json({ message: '이미 사용 중인 이메일입니다.' });
			}
			return res.status(200).json({ message: '사용 가능한 이메일입니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 닉네임 중복 검사
	validatorNickname: async (req: Request, res: Response): Promise<Response> => {
		try {
			const { nickname } = req.params;
			const isDuplicateNickname = await userService.isDuplicateNickname(
				nickname
			);

			if (isDuplicateNickname) {
				return res
					.status(400)
					.json({ message: '이미 사용 중인 닉네임입니다.' });
			}
			return res.status(200).json({ message: '사용 가능한 닉네임입니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 회원 정보 조회
	getUserInformation: async (
		req: Request,
		res: Response
	): Promise<Response> => {
		try {
			const user = req.cookies;
			const isUser = await userService.getUserById(user.id);

			if (!isUser) {
				return res.status(400).json({ message: '사용자를 찾을 수 없습니다.' });
			}
			return res
				.status(200)
				.json({ message: '회원 정보 조회에 성공했습니다.', user });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 회원 정보 수정
	updateProfile: async (req: Request, res: Response): Promise<Response> => {
		try {
			const user = req.cookies;
			const { nickname, password, updatePassword }: UpdateProfileDTO = req.body;

			await userService.updateUser(user.id, nickname, password, updatePassword);
			return res.status(200).json({
				message: '회원 정보 수정에 성공했습니다.',
				user,
			});
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 회원 탈퇴
	withdrawUser: async (req: Request, res: Response): Promise<Response> => {
		try {
			const user = req.cookies;
			const isUser = await userService.deleteUser(user.id);

			if (isUser.affected === 0) {
				return res.status(400).json({
					message: '삭제할 사용자가 존재하지 않습니다.',
				});
			}
			return res.status(200).json({ message: '회원탈퇴에 성공했습니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};
