import { Request, Response, NextFunction } from 'express';
import { adminAuth } from './adminAuth';

export const isAdminMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const { email } = req.body; // 가정: 토큰에서 추출한 사용자 이메일 정보

	try {
		const isAdmin = await adminAuth.isAdmin(email);

		if (!isAdmin) {
			res.status(403).json({
				message: '관리자만 접근할 수 있는 기능입니다.',
			});
		}

		next();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
