import Post, { IPost } from './PostSchema';

export const postService = {
	createPost: async (postData: IPost): Promise<IPost> => {
		try {
			const newPost: IPost = new Post(postData);
			return newPost.save();
		} catch (error) {
			throw error;
		}
	},
};
