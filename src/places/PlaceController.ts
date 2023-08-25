import { Request, Response } from 'express';
import { placeService } from './PlaceService';
import { IPlace } from './PlaceSchema';

export const placeController = {
	getMainPlaces: async (req: Request, res: Response): Promise<void> => {},
	getPlacesByCategory: async (req: Request, res: Response): Promise<void> => {},
	getPlacesById: async (req: Request, res: Response): Promise<void> => {},
	getTotalPlaces: async (req: Request, res: Response): Promise<void> => {},
	likePlace: async (req: Request, res: Response): Promise<void> => {},
	unlikePlace: async (req: Request, res: Response): Promise<void> => {},
	createPlace: async (req: Request, res: Response): Promise<void> => {},
	updatePlace: async (req: Request, res: Response): Promise<void> => {},
	deletePlace: async (req: Request, res: Response): Promise<void> => {},
};
