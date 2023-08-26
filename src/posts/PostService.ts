import { Post } from './PostEntity';

export const postService = {
	createPost: async (postData: Post): Promise<Post> => {
		try {
			const newPost: Post = new Post();
			return newPost.save();
		} catch (error) {
			throw error;
		}
	},
};
