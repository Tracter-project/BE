import { userService } from '../users/UserService';

export const adminAuth = {
	isAdmin: async (email: string): Promise<boolean> => {
		const user = await userService.getUserByEmail(email);

		if (!user) {
			throw new Error('로그인 후 관리자 임을 확인합니다.');
		}
		return user.role === 'admin' ? true : false;
	},
};
