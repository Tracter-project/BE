// imageService.ts
import axios from 'axios';
import { Image } from './ImagesEntity';
import dotenv from 'dotenv';

dotenv.config();

const IMGUR_API_URL = 'https://api.imgur.com/3/upload';
const IMGUR_CLIENT_ID = process.env.IMGUR_CLIENT_ID;

export const imageService = {
	uploadImage: async (imageData: FormData): Promise<string> => {
		try {
			const imageUrl = await imageService.uploadToImgur(imageData);
			const imageEntity = Image.create({ imageUrl });
			const savedImage = await imageEntity.save();
			return savedImage.imageUrl;
		} catch (error) {
			throw new Error(error.message);
		}
	},
	uploadToImgur: async (imageData: FormData): Promise<string> => {
		try {
			const response = await axios.post(IMGUR_API_URL, imageData, {
				headers: {
					Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
				},
			});
			return response.data.data.link;
		} catch (error) {
			throw new Error(error.message);
		}
	},
};
