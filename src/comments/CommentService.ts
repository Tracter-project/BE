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
			newComment.comment = comment;
			return newComment.save();
		} catch (error) {
			throw new Error('createComment: 게시글 등록에 실패했습니다.');
		}
	},
};
