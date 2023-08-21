import Comment, { IComment } from './CommentSchema';

export const commentService = {
	createComment: async (commentData: IComment) => {
		try {
			const newComment: IComment = new Comment(commentData);
			return newComment.save();
		} catch (error) {
			throw error;
		}
	},
};
