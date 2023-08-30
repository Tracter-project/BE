import { Router } from 'express';
import { categoryController } from './CategoryController';
import { adminAuth } from '../middlewares/adminAuthMiddleWare';
import { tokenAuth } from '../middlewares/tokenAuthMiddleWare';

export const categoryRouter = Router();

// 카테고리 전체 조회
categoryRouter.get('/categories', categoryController.getAllCategoryName);
// 카테고리 등록 (관리자 인증 필요)
categoryRouter.post(
	'/admin/categories',
	// tokenAuth,
	// adminAuth,
	categoryController.registeCategoryName
);
// 카레고리 수정 (관리자 인증 필요)
categoryRouter.patch(
	'/admin/categories',
	tokenAuth,
	adminAuth,
	categoryController.updateCategoryName
);
// 카테고리 삭제 (관리자 인증 필요)
categoryRouter.delete(
	'/admin/categories',
	tokenAuth,
	adminAuth,
	categoryController.eraseCategoryName
);
