import { Comment } from './CommentEntity';

export const commentService = {
	createComment: async (commentData: Comment) => {
		try {
			const newComment: Comment = new Comment();
			return newComment.save();
		} catch (error) {
			throw error;
		}
	},
};
