import { Request, Response, NextFunction } from 'express';

export const adminAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<any> => {
	const user = req.cookies;

	try {
		const isAdmin = user.role === 'admin' ? true : false;

		if (!isAdmin) {
			return res.status(403).json({
				message: '관리자만 접근할 수 있는 기능입니다.',
			});
		}

		next();
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
