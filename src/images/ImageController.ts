// imageController.ts
import { Request, Response } from 'express';
import { imageService } from './ImagesService';

export const imageController = {
	uploadImage: async (req: Request, res: Response): Promise<Response> => {
		try {
			if (!req.file) {
				return res.status(400).json({ error: 'Missing image data' });
			}

			const image = req.file;
			const formData = new FormData();
			const imageBlob = new Blob([image.buffer], { type: image.mimetype });

			formData.append('image', imageBlob, image.originalname);

			const imageUrl = await imageService.uploadImage(formData);

			return res.status(200).json({ imageUrl });
		} catch (error) {
			return res.status(500).json({ error: 'Internal server error' });
		}
	},
};
