import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { Auth } from './Auth';

dotenv.config();

export async function tokenAuth(
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> {
	try {
		const { token } = req.body;

		if (!token) {
			throw new Error('토큰이 없습니다.');
		}

		if (typeof process.env.SECRET_KEY !== 'string') {
			throw new Error('미들웨어에 SECRET_KEY가 읽히지지 않습니다.');
		}

		const decoded = jwt.verify(token, process.env.SECRET_KEY);

		if (
			!decoded ||
			typeof decoded !== 'object' ||
			typeof decoded.userId !== 'string'
		) {
			throw new Error('토큰 디코드가 이루어지지 않았거나 유효하지 않습니다.');
		}
		const userId: string = decoded.userId;
		req.user = userId;

		next();
	} catch (error) {
		next(error);
	}
}
