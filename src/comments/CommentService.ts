import { DeleteResult, UpdateResult } from 'typeorm';
import { Comment } from './CommentEntity';
import { userService } from '../users/UserService';

export const commentService = {
	// 댓글 작성
	createComment: async (
		userId: number,
		articleId: number,
		comment: string
	): Promise<Comment> => {
		try {
			const isUser = await userService.getUserById(userId);

			if (!isUser) {
				throw new Error(
					'createComment: 로그인한 사용하자만 댓글을 작성할 수 있습니다.'
				);
			}

			const newComment: Comment = new Comment();
			if (!articleId) {
				throw new Error('createComment: 댓글이 존재하지 않습니다.');
			}

			// newComment.article =
			newComment.comment = comment;
			newComment.writer = isUser.nickname;
			return Comment.save(newComment);
		} catch (error) {
			throw new Error(error.message);
		}
	},
	// 댓글 수정
	updateComment: async (
		userId: number,
		id: number,
		comment: string
	): Promise<UpdateResult> => {
		try {
			const isUser = await userService.getUserById(userId);
			const updateComment = await commentService.getCommentById(id);

			if (!updateComment) {
				throw new Error('updateComment: 수정할 댓글을 찾을 수 없습니다.');
			}

			if (isUser !== null && isUser.nickname !== updateComment.writer) {
				throw new Error(
					'updateComment: 댓글 작성자가 아니라 댓글을 수정할 수 없습니다.'
				);
			}

			updateComment.comment = comment;

			return Comment.update({ id }, { comment });
		} catch (error) {
			throw new Error(error.message);
		}
	},
	// 댓글 삭제
	deleteComment: async (userId: number, id: number): Promise<DeleteResult> => {
		try {
			const isUser = await userService.getUserById(userId);
			const deleteComment = await commentService.getCommentById(id);

			if (!deleteComment) {
				throw new Error('deleteComment: 수정할 댓글을 찾을 수 없습니다.');
			}

			if (isUser !== null && isUser.nickname !== deleteComment.writer) {
				throw new Error(
					'deleteComment: 댓글 작성자가 아니라 댓글을 삭제할 수 없습니다.'
				);
			}

			const deleteResult = await Comment.delete({ id });

			if (deleteResult.affected === 0) {
				throw new Error('deleteComment: 삭제할 댓글이 존재하지 않습니다.');
			}

			return deleteResult;
		} catch (error) {
			throw new Error(error.message);
		}
	},

	// 댓글 조회(id)
	getCommentById: async (id: number): Promise<Comment | null> => {
		return await Comment.findOne({ where: { id } });
	},

	// 댓글 조회(articleId)
	getCommentByArticleId: async (articleId: number): Promise<Comment[]> => {
		return await Comment.find({ where: { article: { id: articleId } } });
	},
};
