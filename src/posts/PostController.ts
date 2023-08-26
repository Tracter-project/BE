import { Request, Response } from 'express';
import { postService } from './PostService';
import { Post } from './PostEntity';

export const postController = {
	getAllPosts: async (req: Request, res: Response): Promise<void> => {},

	createPost: async (req: Request, res: Response): Promise<Response> => {
		const postData: Post = req.body;

		try {
			const newPost: Post = await postService.createPost(postData);
			return res.status(201).json(newPost);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	getPostById: async (req: Request, res: Response): Promise<void> => {},
	updatePost: async (req: Request, res: Response): Promise<void> => {},
	deletePost: async (req: Request, res: Response): Promise<void> => {},
};
