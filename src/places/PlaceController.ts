import { Request, Response } from 'express';
import { placeService } from './PlaceService';
import { userService } from '../users/UserService';
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
					message: 'getMainPlaces: 메인 페이지의 자료를 찾을 수 없습니다.',
				});
			}
			return res.status(200).json({ placeByCreateAt, placeByLikeCount });
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
			const { id } = req.params;

			if (!id) {
				return res
					.status(400)
					.json({ message: '카테고리를 선택하지 않았습니다.' });
			}

			const placesInCategory = await placeService.getPlacesByCategory(
				Number(id)
			);

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
	// 숙소 상세 조회
	getPlaceDetail: async (req: Request, res: Response): Promise<Response> => {
		try {
			const { id } = req.params;
			const place = await placeService.getPlaceById(Number(id));

			if (!place) {
				return res
					.status(400)
					.json({ message: 'getPlaceDetail: 숙소 페이지를 찾을 수 없습니다.' });
			}

			return res.status(200).json(200).json({ place });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 전체 숙소 조회
	getTotalPlaces: async (req: Request, res: Response): Promise<Response> => {
		try {
			const allPlaces = await placeService.getAllPlaceName();

			if (!allPlaces || allPlaces.length === 0) {
				return res
					.status(400)
					.json({ message: 'getTotalPlaces: 전체 숙소를 조회할 수 없습니다.' });
			}

			return res.status(200).json(allPlaces);
		} catch (error) {
			return res.status(500).json({ error: error.message });
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

			const likeUser = await userService.getUserById(user.id);
			const place = await placeService.getPlaceById(placeId);

			if (!likeUser || !place) {
				return res.status(400).json({
					message: 'unlikePlaces: 숙소 좋아요 처리에 필요한 정보가 부족합니다.',
				});
			}

			await placeService.likePlace(likeUser, place, like);

			return res
				.status(200)
				.json({ message: `숙소 좋아요 처리에 성공했습니다.` });
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
				!bannerImage ||
				!mainImage ||
				!detailImage ||
				!bookingURL
			) {
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
				return res
					.status(400)
					.json({ message: 'registPlace:누락된 값이 있습니다.' });
			}
			return res
				.status(201)
				.json({ message: 'registePlace:숙소가 등록되었습니다.' });
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
				.json({ message: 'updatePlace: 숙소 수정에 성공했습니다.' });
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
			return res
				.status(200)
				.json({ message: 'erasePlace: 숙소 삭제에 성공했습니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};
