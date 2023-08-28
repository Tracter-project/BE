import { userService } from '../users/UserService';
import { Category } from '../categories/CategoryEntity';
import { Place, RegionEnum } from './PlaceEntity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { User } from '../users/UserEntity';
import { UserLikePlaces } from '../entities/UserLikePlacesEntity';

export const placeService = {
	// 숙소 등록
	createPlace: async (
		placeName: string,
		price: string,
		description: string,
		category: Category,
		region: RegionEnum,
		bannerImage: string,
		mainImage: string,
		detailImage: string[],
		bookingURL: string
	): Promise<Place> => {
		try {
			const newPlace: Place = new Place();
			newPlace.placeName = placeName;
			newPlace.price = price;
			newPlace.description = description;
			newPlace.category = category;
			newPlace.region = region;
			newPlace.bannerImage = bannerImage;
			newPlace.mainImage = mainImage;
			newPlace.detailImage = detailImage;
			newPlace.bookingURL = bookingURL;
			return newPlace.save();
		} catch (error) {
			throw new Error('createPlace: 숙소 등록에 실패했습니다.');
		}
	},
	// 숙소 수정
	updatePlace: async (
		id: number,
		placeName: string,
		price: string,
		description: string,
		category: Category,
		region: RegionEnum,
		bannerImage: string,
		mainImage: string,
		detailImage: string[],
		bookingURL: string
	): Promise<UpdateResult> => {
		const place = await placeService.getPlaceById(id);

		if (!place) {
			throw new Error('updatePlace: 게시글을 찾을 수 없습니다.');
		}
		place.placeName = placeName;
		place.price = price;
		place.description = description;
		place.category = category;
		place.region = region;
		place.bannerImage = bannerImage;
		place.mainImage = mainImage;
		place.detailImage = detailImage;
		place.bookingURL = bookingURL;

		return Place.update(
			{ id },
			{
				placeName,
				price,
				description,
				category,
				region,
				bannerImage,
				mainImage,
				detailImage,
				bookingURL,
			}
		);
	},
	// 숙소 삭제
	deletePlace: async (id: number): Promise<DeleteResult> => {
		try {
			const DeleteResult = await Place.delete({ id });

			if (DeleteResult.affected === 0) {
				throw new Error('deletePlace: 삭제할 숙소가 존재하지 않습니다.');
			}
			return DeleteResult;
		} catch (error) {
			throw new Error('deletePlace: 숙소 삭제에 실패했습니다.');
		}
	},

	// 좋아요 수 수정
	updateLikePlaceCounter: async (
		place: Place,
		increment: number
	): Promise<void> => {
		try {
			place.placeLikeCount += increment;
			await Place.save(place);
		} catch (error) {
			throw new Error('updateLikePlaceCounter: 좋아요 수 증감에 실패했습니다.');
		}
	},

	// 장소_좋아요
	likePlace: async (user: User, place: Place): Promise<void> => {
		try {
			const userLikedPlace = await UserLikePlaces.find({
				where: { user: { id: user.id }, place: { id: place.id } },
			});

			if (userLikedPlace) {
				throw new Error('likePlace: 이미 좋아요한 장소입니다.');
			}

			const userLike = new UserLikePlaces();
			userLike.user = user;
			userLike.place = place;

			await UserLikePlaces.save(userLike);
			await placeService.updateLikePlaceCounter(place, 1);
		} catch (error) {
			throw new Error('likePlace: 장소에 좋아요가 실패했습니다.');
		}
	},

	// 장소_좋아요 취소
	unlikePlace: async (user: User, place: Place): Promise<void> => {
		try {
			const userLikedPlace = await UserLikePlaces.find({
				where: { user: { id: user.id }, place: { id: place.id } },
			});

			if (!userLikedPlace) {
				throw new Error(
					'unlikePlace: 좋아요가 존재하지 않아 삭제할 수 없습니다.'
				);
			}
			UserLikePlaces.remove(userLikedPlace);
			await placeService.updateLikePlaceCounter(place, -1);
		} catch (error) {
			throw new Error('unlikePlace: 좋아요 삭제에 실패했습니다.');
		}
	},
	// 숙소 전체 조회
	getAllPlaceName: async (): Promise<Place[]> => {
		return await Place.find();
	},
	// 카테고리별 숙소 조회
	getPlacesByCategory: async (category: string) => {
		try {
			const placesInCategory = await Place.find({
				where: { category: { categoryName: category } },
			});

			return placesInCategory;
		} catch (error) {
			throw new Error(
				'getPlacesByCategory: 카테고리별 숙소 조회에 실패했습니다.'
			);
		}
	},
	// 숙소 검색(categoryName)
	getPlaceByCategoryName: async (
		categoryName: string
	): Promise<Place | null> => {
		try {
			const category = await Category.findOne({ where: { categoryName } });

			if (!category) {
				throw new Error(
					'getPlaceByCategoryName: 해당 카테고리가 존재하지 않습니다.'
				);
			}

			return await Place.findOne({
				where: { category: { categoryName } },
				relations: ['category', 'images'],
			});
		} catch (error) {
			throw new Error('숙소 검색에 실패했습니다.');
		}
	},

	// 숙소 검색(id)
	getPlaceById: async (id: number): Promise<Place | null> => {
		return await Place.findOne({ where: { id } });
	},
};
