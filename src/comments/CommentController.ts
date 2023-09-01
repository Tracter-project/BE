import { Request, Response } from 'express';
import { commentService } from './CommentService';
import {
	EraseCommentDTO,
	RegisteCommentDTO,
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
					.json('게시글이 삭제되었거나 댓글 내용이 없습니다. ');
			}
			await commentService.createComment(user.id, articleId, comment);
			return res.status(201).json({ message: '댓글 등록에 성공했습니다.' });
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
			return res.status(201).json({ message: '댓글 수정에 성공했습니다.' });
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
			return res.status(201).json({ message: '댓글 삭제에 성공했습니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 댓글 조회
	searchComment: async (req: Request, res: Response): Promise<Response> => {
		try {
			const { articleId } = req.params;

			const comment = await commentService.getCommentByArticleId(
				Number(articleId)
			);
			return res.status(200).json({ message: '댓글 조회에 성공했습니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};
