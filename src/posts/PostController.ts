import { Request, Response } from 'express';
import { postService } from './PostService';
import { IPost } from './PostSchema';

export const postController = {
	getAllPosts: async (req: Request, res: Response): Promise<void> => {},

	createPost: async (req: Request, res: Response): Promise<Response> => {
		const postData: IPost = req.body;

		try {
			const newPost: IPost = await postService.createPost(postData);
			return res.status(201).json(newPost);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	getPostById: async (req: Request, res: Response): Promise<void> => {},
	updatePost: async (req: Request, res: Response): Promise<void> => {},
	deletePost: async (req: Request, res: Response): Promise<void> => {},
};
