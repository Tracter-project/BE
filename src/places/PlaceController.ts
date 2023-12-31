import { Request, Response } from 'express';
import { placeService } from './PlaceService';

import {
	ErasePlaceDTO,
	RegistePlaceDTO,
	UpdatePlaceDTO,
	LikePlacesDTO,
} from './PlaceDTO';

export const placeController = {
	// 메인페이지 숙소 조회
	getMainPlaces: async (req: Request, res: Response): Promise<Response> => {
		try {
			const placeByCreateAt = await placeService.getPlacesByCreateAtSorted();
			const placeByLikeCount = await placeService.getPlaceByLikeCountSorted();

			if (!placeByCreateAt || !placeByLikeCount) {
				return res.status(400).json({
					message: '메인 페이지의 자료를 찾을 수 없습니다.',
				});
			}
			return res.status(200).json({
				placeByCreateAt,
				placeByLikeCount,
			});
		} catch (error) {
			throw new Error(error.message);
		}
	},
	// 카테고리별 숙소 조회
	getPlacesByCategory: async (
		req: Request,
		res: Response
	): Promise<Response> => {
		try {
			const { category } = req.params;
			if (!category) {
				return res
					.status(400)
					.json({ message: '카테고리를 선택하지 않았습니다.' });
			}
			const placesInCategory = await placeService.getPlacesByCategory(category);

			if (placesInCategory.length === 0) {
				return res
					.status(400)
					.json({ message: '해당 카테고리에는 숙소가 없습니다.' });
			}

			return res.status(200).json(placesInCategory);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 전체 숙소 조회
	getTotalPlaces: async (req: Request, res: Response): Promise<Response> => {
		try {
			const allPlaces = await placeService.getAllPlaceName();

			return res.status(200).json(allPlaces);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 숙소 상세페이지 조회
	getPlaceDetail: async (req: Request, res: Response): Promise<Response> => {
		try {
			const { placeId } = req.params;
			const place = await placeService.getPlaceById(Number(placeId));

			if (!place) {
				return res
					.status(400)
					.json({ message: '숙소 페이지를 찾을 수 없습니다.' });
			}

			return res.status(200).json(place);
		} catch (error) {
			return res.status(500).json({ error: '에러' });
		}
	},

	// 숙소 좋아요 처리
	handleLikePlaces: async (
		req: Request,
		res: Response,
		like: boolean
	): Promise<Response> => {
		try {
			const user = req.cookies;
			const { placeId }: LikePlacesDTO = req.body;
			const place = await placeService.getPlaceById(placeId);

			if (!place) {
				return res.status(400).json({
					message: '숙소가 존재하지 않습니다.',
				});
			}

			await placeService.likePlace(user, place, like);

			const message = like
				? '숙소 좋아요에 성공했습니다.'
				: '숙소 좋아요 취소에 성공했습니다.';

			return res.status(200).json({ message });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 숙소 등록
	registePlace: async (req: Request, res: Response): Promise<Response> => {
		try {
			const admin = req.cookies;
			const {
				placeName,
				price,
				description,
				category,
				region,
				bannerImage,
				mainImage,
				detailImage,
				bookingURL,
			}: RegistePlaceDTO = req.body;
			if (
				!placeName ||
				!price ||
				!description ||
				!category ||
				!region ||
				!mainImage ||
				!bookingURL
			) {
				return res.status(400).json({ message: '누락된 필수 값이 있습니다.' });
			}

			await placeService.createPlace(
				admin.id,
				placeName,
				price,
				description,
				category,
				region,
				bannerImage,
				mainImage,
				detailImage,
				bookingURL
			);

			return res.status(201).json({ message: '숙소 등록에 성공했습니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 숙소 수정
	updatePlace: async (req: Request, res: Response): Promise<Response> => {
		try {
			const admin = req.cookies;
			const {
				id,
				placeName,
				price,
				description,
				category,
				region,
				bannerImage,
				mainImage,
				detailImage,
				bookingURL,
			}: UpdatePlaceDTO = req.body;

			if (
				!placeName ||
				!price ||
				!description ||
				!category ||
				!region ||
				!mainImage ||
				!bookingURL
			) {
				return res.status(400).json({ message: '누락된 필수 값이 있습니다.' });
			}

			await placeService.updatePlace(
				admin.id,
				id,
				placeName,
				price,
				description,
				category,
				region,
				bannerImage,
				mainImage,
				detailImage,
				bookingURL
			);
			return res
				.status(200)
				.json({ message: '숙소 정보 수정에 성공했습니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 숙소 삭제
	erasePlace: async (req: Request, res: Response): Promise<Response> => {
		try {
			const admin = req.cookies;
			const { id }: ErasePlaceDTO = req.body;

			await placeService.deletePlace(admin.id, id);
			return res.status(200).json({ message: '숙소 삭제에 성공했습니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};
