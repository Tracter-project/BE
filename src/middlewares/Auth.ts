import { userService } from '../users/UserService';

export const Auth = {
	isUser: async (token: string): Promise<string> => {
		const user = await userService.getUserByToken(token);

		if (!user) {
			throw new Error('인증되지 않은 사용자입니다.');
		}
		return user.role;
	},

	isAdmin: async (email: string): Promise<boolean> => {
		const user = await userService.getUserByEmail(email);

		if (!user) {
			throw new Error('로그인 후 관리자 임을 확인합니다.');
		}
		return user.role === 'admin' ? true : false;
	},
};
