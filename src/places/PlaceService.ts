import Place, { IPlace } from './PlaceSchema';

export const placeService = {
	createPlace: async (placeData: IPlace): Promise<IPlace> => {
		try {
			const newPlace: IPlace = new Place(placeData);
			return newPlace.save();
		} catch (error) {
			throw error;
		}
	},
};
