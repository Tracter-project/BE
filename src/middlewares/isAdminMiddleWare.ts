import { Request, Response, NextFunction } from 'express';
import { Auth } from './Auth';

export const isAdminMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	const { email } = req.body;
	try {
		const isAdmin = await Auth.isAdmin(email);

		if (!isAdmin) {
			//
			return res.status(403).json({
				message: '관리자만 접근할 수 있는 기능입니다.',
			});
		}

		next();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
