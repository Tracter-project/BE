import { DeleteResult, UpdateResult } from 'typeorm';
import { userService } from '../users/UserService';
import { Category } from '../categories/CategoryEntity';
import { Place, RegionEnum } from './PlaceEntity';
import { User } from '../users/UserEntity';
import { UserLikePlaces } from '../entities/UserLikePlacesEntity';

export const placeService = {
	// 숙소 검색(order createAt)
	getPlacesByCreateAtSorted: async (): Promise<Place[]> => {
		return await Place.find({
			order: { createdAt: 'DESC' },
		});
	},
	// 숙소 검색(order likecount)
	getPlaceByLikeCountSorted: async (): Promise<Place[]> => {
		return await Place.find({
			order: { placeLikeCount: 'DESC' },
		});
	},

	// 숙소 검색(id)
	getPlaceById: async (id: number): Promise<Place | null> => {
		return await Place.findOne({ where: { id } });
	},
	// 숙소 전체 조회
	getAllPlaceName: async (): Promise<Place[]> => {
		return await Place.find();
	},
	// 카테고리별 숙소 조회
	getPlacesByCategory: async (category: string) => {
		try {
			const placesInCategory = await Place.find({
				where: { category },
			});
			console.log(placesInCategory, category);
			return placesInCategory;
		} catch (error) {
			throw new Error(error.message);
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

			return await Place.findOne({ where: { category: categoryName } });
		} catch (error) {
			throw new Error(error.message);
		}
	},
	// 좋아요 카운트 수정
	updateLikePlaceCounter: async (
		place: Place,
		increment: number
	): Promise<void> => {
		try {
			place.placeLikeCount += increment;
			await Place.save(place);
		} catch (error) {
			throw new Error(error.message);
		}
	},

	// 장소 좋아요 또는 좋아요 취소
	likePlace: async (user: User, place: Place, like: boolean): Promise<void> => {
		try {
			const userLikedPlace = await UserLikePlaces.find({
				where: { user: { id: user.id }, place: { id: place.id } },
			});

			if (like && userLikedPlace) {
				throw new Error('이미 좋아요한 숙소입니다.');
			}

			if (!like && !userLikedPlace) {
				throw new Error('이미 좋아요 취소한 숙소입니다.');
			}

			if (like) {
				const userLike = new UserLikePlaces();
				userLike.user = user;
				userLike.place = place;

				await UserLikePlaces.save(userLike);
				await placeService.updateLikePlaceCounter(place, 1);
			} else {
				UserLikePlaces.remove(userLikedPlace);
				await placeService.updateLikePlaceCounter(place, -1);
			}
		} catch (error) {
			throw new Error(error.message);
		}
	},

	// 숙소 등록
	createPlace: async (
		userId: number,
		placeName: string,
		price: string,
		description: string,
		category: string,
		region: RegionEnum,
		bannerImage: string,
		mainImage: string,
		detailImage: string[],
		bookingURL: string
	): Promise<Place> => {
		try {
			const isAdmin = await userService.getUserById(userId);

			if (!isAdmin) {
				throw new Error(`createPlace: 관리자만 숙소를 등록할 수 있습니다.`);
			}

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

			return Place.save(newPlace);
		} catch (error) {
			throw new Error(error.message);
		}
	},
	// 숙소 수정
	updatePlace: async (
		userId: number,
		id: number,
		placeName: string,
		price: string,
		description: string,
		category: string,
		region: RegionEnum,
		bannerImage: string,
		mainImage: string,
		detailImage: string[],
		bookingURL: string
	): Promise<UpdateResult> => {
		try {
			const isAdmin = await userService.getUserById(userId);

			if (!isAdmin) {
				throw new Error(`updatePlace: 관리자만 숙소를 수정할 수 있습니다.`);
			}

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
		} catch (error) {
			throw new error(error.message);
		}
	},
	// 숙소 삭제
	deletePlace: async (userId: number, id: number): Promise<DeleteResult> => {
		try {
			const isAdmin = await userService.getUserById(userId);

			if (!isAdmin) {
				throw new Error(`updatePlace: 관리자만 숙소를 삭제할 수 있습니다.`);
			}

			const DeleteResult = await Place.delete({ id });

			if (DeleteResult.affected === 0) {
				throw new Error('deletePlace: 삭제할 숙소가 존재하지 않습니다.');
			}
			return DeleteResult;
		} catch (error) {
			throw new Error(error.message);
		}
	},
};
