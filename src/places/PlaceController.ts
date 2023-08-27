import { Request, Response } from 'express';
import { placeService } from './PlaceService';
import { ErasePlaceDTO, RegistePlaceDTO, UpdatePlaceDTO } from './PlaceDTO';

export const placeController = {
	// 메인페이지 숙소 조회
	getMainPlaces: async (req: Request, res: Response): Promise<void> => {},
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

			if (allPlaces) {
				return res
					.status(400)
					.json({ message: 'getTotalPlaces: 전체 숙소를 조회할 수 없습니다.' });
			}
			return res.status(200).json();
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 숙소 좋아요
	likePlace: async (req: Request, res: Response): Promise<void> => {},
	// 숙소 좋아요 취소
	unlikePlace: async (req: Request, res: Response): Promise<void> => {},
	// 숙소 등록
	registePlace: async (req: Request, res: Response): Promise<Response> => {
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
		try {
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
			const { id }: ErasePlaceDTO = req.body;

			await placeService.deletePlace(id);
			return res
				.status(200)
				.json({ message: 'erasePlace: 숙소 삭제에 성공했습니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};
