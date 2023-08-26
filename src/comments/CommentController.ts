import { Request, Response } from 'express';
import { commentService } from './CommentService';
import { RegisteCommentDTO } from './CommentDTO';

export const commentController = {
	// 댓글 등록
	registeComment: async (req: Request, res: Response): Promise<Response> => {
		const { articleId, writer, comment }: RegisteCommentDTO = req.body;
		try {
			if (!articleId || !comment) {
				return res
					.status(400)
					.json('registeComment: 게시글이 삭제되었거나 댓글내용이 없습니다. ');
			}
			await commentService.createComment(articleId, writer, comment);
			return res
				.status(201)
				.json({ message: 'registeComment: 댓글이 등록되었습니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	updateComment: async (req: Request, res: Response): Promise<void> => {},
	deleteComment: async (req: Request, res: Response): Promise<void> => {},
};
