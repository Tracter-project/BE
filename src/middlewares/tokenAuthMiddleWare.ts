import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { userService } from '../users/UserService';

dotenv.config();

export const tokenAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	try {
		const { token } = req.body;
		if (!token) {
			throw new Error('토큰이 없습니다.');
		}

		const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string);

		console.log(decodedToken);

		if (!decodedToken) {
			throw new Error('토큰 디코드가 이루어지지 않았거나 유효하지 않습니다.');
		}

		if (
			typeof decodedToken !== 'object' ||
			typeof decodedToken.userId !== 'number'
		) {
			throw new Error('유효하지 않은 토큰입니다.');
		}

		const userId: number = decodedToken.userId;
		const user = await userService.getUserById(userId);

		if (!user) {
			throw new Error('토큰 값을 읽을 수 없습니다.');
		}

		req.cookies = user;
		next();
	} catch (error) {
		next(error);
	}
};
