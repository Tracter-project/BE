import axios from 'axios';

const IMGUR_API_URL = 'https://api.imgur.com/3';

export const uploadImage = async (
	clientId: string,
	image: Buffer
): Promise<string | void> => {
	try {
		const response = await axios.post(`${IMGUR_API_URL}/upload`, image, {
			headers: {
				Authorization: `Client-ID ${clientId}`,
				'Content-Type': 'image/jpeg', // Adjust content type accordingly
			},
		});

		if (response.status === 200) {
			return response.data.data.link;
		} else {
			console.error('Image upload failed:', response.data);
		}
	} catch (error) {
		console.error('Error uploading image:', error);
	}
};
