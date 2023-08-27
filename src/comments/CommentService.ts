import { DeleteResult, UpdateResult } from 'typeorm';
import { Comment } from './CommentEntity';

export const commentService = {
	// 댓글 작성
	createComment: async (
		articleId: number,
		writer: number,
		comment: string
	): Promise<Comment> => {
		try {
			const newComment: Comment = new Comment();
			if (!articleId) {
				throw new Error('createComment: 게시글이 존재하지 않습니다.');
			}
			if (!writer) {
				throw new Error('createComment: 로그인 사용자만 이용할 수 있습니다.');
			}
			newComment.comment = comment;
			return newComment.save();
		} catch (error) {
			throw new Error('createComment: 게시글 등록에 실패했습니다.');
		}
	},
	// 댓글 수정
	updateComment: async (id: number, comment: string): Promise<UpdateResult> => {
		const updateComment = await commentService.getCommentById(id);

		if (!updateComment) {
			throw new Error('updateComment: 수정할 댓글을 찾을 수 없습니다.');
		}
		updateComment.comment = comment;

		return Comment.update({ id }, { comment });
	},
	// 댓글 삭제
	deleteComment: async (id: number): Promise<DeleteResult> => {
		try {
			const deleteResult = await Comment.delete({ id });

			if (deleteResult.affected === 0) {
				throw new Error('deleteComment: 삭제할 댓글이 존재하지 않습니다.');
			}

			return deleteResult;
		} catch (error) {
			throw new Error('deleteComment: 댓글 삭제에 실패했습니다.');
		}
	},
	// 댓글 조회(id)
	getCommentById: async (id: number): Promise<Comment | null> => {
		return await Comment.findOne({ where: { id } });
	},
};
