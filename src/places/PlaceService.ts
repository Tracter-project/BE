import { Place } from './PlaceEntity';

export const placeService = {
	createPlace: async (placeData: Place): Promise<Place> => {
		try {
			const newPlace: Place = new Place();
			return newPlace.save();
		} catch (error) {
			throw error;
		}
	},
};
