import { Router } from 'express';
import { placeController } from './PlaceController';
import { tokenAuth } from '../middlewares/tokenAuthMiddleWare';
import { adminAuth } from '../middlewares/adminAuthMiddleWare';

export const placeRouter: Router = Router();

// 메인페이지 숙소 조회›
placeRouter.get('/places', placeController.getMainPlaces);
// 카테고리별 숙소 조회
placeRouter.get(
	'/places/categories/:category',
	placeController.getPlacesByCategory
); // 숙소 좋아요 (인증 필요)
placeRouter.post('/places/likes', tokenAuth, (req, res) =>
	placeController.handleLikePlaces(req, res, true)
);
// 숙소 좋아요 취소 (인증 필요)
placeRouter.delete('/places/likes', tokenAuth, (req, res) =>
	placeController.handleLikePlaces(req, res, false)
);
/// 전체 숙소 조회
placeRouter.get('/places/all', placeController.getTotalPlaces);
// 숙소 상세 조회
placeRouter.get('/places/:placeId', placeController.getPlaceDetail);

// 숙소 등록 (관리자 인증 필요)
placeRouter.post(
	'/admin/places',
	tokenAuth,
	adminAuth,
	placeController.registePlace
);
// 숙소 수정 (관리자 인증 필요)
placeRouter.patch(
	'/admin/places',
	tokenAuth,
	adminAuth,
	placeController.updatePlace
);
// 숙소 삭제 (관리자 인증 필요)
placeRouter.delete(
	'/admin/places',
	tokenAuth,
	adminAuth,
	placeController.erasePlace
);
