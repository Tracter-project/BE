import { Router } from 'express';
import placeController from './PlaceController';
// 회원, 관리자 구분 미들웨어 필요

const placeRouter = Router();

// 메인페이지 숙소 조회
placeRouter.get('/places', placeController.getMainPlaces);

// 카테고리별 숙소 조회
placeRouter.get(
	'/places/categories/:category',
	placeController.getPlacesByCategory
);

// 숙소 상세 조회
placeRouter.get('/places/:placeId', placeController.getPlacesById);

// 회원 구분 미들웨어 필요
// [회원] 숙소 좋아요
placeRouter.post('/places/likes', placeController.likePlace);

// [회원] 숙소 좋아요 취소
placeRouter.delete('/places/likes', placeController.unlikePlace);

// 관리자 구분 미들웨어 필요
// [관리자] 전체 숙소 조회
placeRouter.get('/admin/places', placeController.getTotalPlaces);

// [관리자] 숙소 등록
placeRouter.patch('/admin/places', placeController.createPlace);

// [관리자] 숙소 수정
placeRouter.patch('/admin/places', placeController.updatePlace);

// [관리자] 숙소 삭제
placeRouter.delete('/admin/places', placeController.deletePlace);

export default placeRouter;
