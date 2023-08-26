import { Request, Response } from 'express-serve-static-core';
import { categoryService } from './CategoryService';
import { isAdminMiddleware } from '../middlewares/isAdminMiddleWare';

export const categoryController = {
	// 카테고리 전체 조회
	getCategoryNameList: async (
		req: Request,
		res: Response
	): Promise<Response> => {
		try {
			const allCategories = await categoryService.getAllCategoryName();

			if (!allCategories) {
				return res.status(400).json({
					message: 'getCategoryNameList: 카테고리가 없습니다.',
				});
			}
			return res.status(200).json(allCategories);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 카테고리 등록
	registeCategoryName:
		// [isAdminMiddleware,
		async (req: Request, res: Response): Promise<Response> => {
			const { categoryName } = req.body;

			try {
				if (!categoryName) {
					return res
						.status(400)
						.json({ message: 'createCategory:category 값을 없습니다.' });
				}

				await categoryService.createCategory(categoryName);
				return res
					.status(201)
					.json({ message: 'createCategory: 카테고리 등록이 완료되었습니다.' });
			} catch (error) {
				return res.status(500).json({ error: error.message });
			}
		},
	// ],
	// 카테고리 정보 수정
	updateCategoryName:
		// [isAdminMiddleware,
		async (req: Request, res: Response): Promise<Response> => {
			try {
				const { categoryName, updateCategoryName } = req.body;

				await categoryService.updateCategory(categoryName, updateCategoryName);

				return res.status(200).json({
					message: 'updateCategoryName: 카테고리 정보 수정에 성공했습니다.',
				});
			} catch (error) {
				return res.status(500).json({ error: error.message });
			}
		},
	// ],
	// 카테고리 삭제
	eraseCategoryName:
		// [isAdminMiddleware,
		async (req: Request, res: Response): Promise<Response> => {
			try {
				const { categoryName } = req.params;

				await categoryService.deleteCategory(categoryName);
				return res.status(200).json({
					message: 'eraseCategoryName: 카테고리 삭제에 성공했습니다.',
				});
			} catch (error) {
				return res.status(500).json({ error: error.message });
			}
		},
	// ],
};
