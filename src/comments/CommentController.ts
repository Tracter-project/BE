import { Request, Response } from 'express';
import { commentService } from './CommentService';
import {
	EraseCommentDTO,
	RegisteCommentDTO,
	SeactchCommentDTO,
	UpdateCommentDTO,
} from './CommentDTO';

export const commentController = {
	// 댓글 등록
	registeComment: async (req: Request, res: Response): Promise<Response> => {
		try {
			const user = req.cookies;
			const { articleId, comment }: RegisteCommentDTO = req.body;

			if (!articleId || !comment) {
				return res
					.status(400)
					.json('registeComment: 게시글이 삭제되었거나 댓글내용이 없습니다. ');
			}
			await commentService.createComment(user.id, articleId, comment);
			return res
				.status(201)
				.json({ message: 'registeComment: 댓글이 등록되었습니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 댓글 수정
	updateComment: async (req: Request, res: Response): Promise<Response> => {
		try {
			const user = req.cookies;
			const { id, comment }: UpdateCommentDTO = req.body;

			await commentService.updateComment(user.id, id, comment);
			return res
				.status(201)
				.json({ message: 'updateComment: 댓글이 수정되었습니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 댓글 삭제
	eraseComment: async (req: Request, res: Response): Promise<Response> => {
		try {
			const user = req.cookies;
			const { id }: EraseCommentDTO = req.body;

			await commentService.deleteComment(user.id, id);
			return res
				.status(201)
				.json({ message: 'registeComment: 댓글이 삭제되었습니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 댓글 조회
	searchComment: async (req: Request, res: Response): Promise<Response> => {
		try {
			const { articleId } = req.params;

			await commentService.getCommentByArticleId(Number(articleId));
			return res
				.status(200)
				.json({ message: 'registeComment: 댓글을 조회했습니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};
