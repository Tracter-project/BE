import { Router } from 'express';
import categoryController from './CategoryController';
// 관리자 구분 미들웨어 필요

const categoryRouter = Router();

// 카테고리 전체 조회
categoryRouter.get('/categories', categoryController.getCategoryNameList);

// 관리자 구분 미들웨어 필요
// [관리자] 카테고리 등록
categoryRouter.post('/admin/categories', categoryController.createCategory);

// [관리자] 카레고리 수정
categoryRouter.patch(
	'/admin/categories',
	categoryController.updateCategoryName
);

// [관리자] 카테고리 삭제
categoryRouter.delete(
	'/admin/categories',
	categoryController.deleteCategoryName
);

export default categoryRouter;
