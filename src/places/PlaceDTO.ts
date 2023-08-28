import { Category } from '../categories/CategoryEntity';
import { RegionEnum } from './PlaceEntity';

export class RegistePlaceDTO {
	placeName: string;
	price: string;
	description: string;
	category: Category;
	region: RegionEnum;
	bannerImage: string;
	mainImage: string;
	detailImage: string[];
	bookingURL: string;
}

export class UpdatePlaceDTO {
	id: number;
	placeName: string;
	price: string;
	description: string;
	category: Category;
	region: RegionEnum;
	bannerImage: string;
	mainImage: string;
	detailImage: string[];
	bookingURL: string;
}

export class ErasePlaceDTO {
	id: number;
}

export class LikePlacesDTO {
	email: string;
	placeId: number;
}
