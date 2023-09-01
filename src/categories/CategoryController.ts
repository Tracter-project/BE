import { Request, Response } from 'express-serve-static-core';
import { categoryService } from './CategoryService';
import {
	RegisteCategoryDTO,
	UpdateCategoryDTO,
	EraseCategoryDTO,
} from './CategoryDTO';

export const categoryController = {
	// 카테고리 전체 조회
	getAllCategoryName: async (
		req: Request,
		res: Response
	): Promise<Response> => {
		try {
			const allCategories = await categoryService.getAllCategoryName();

			if (!allCategories) {
				return res.status(400).json({
					message: '카테고리를 찾을 수 없습니다.',
				});
			}
			return res
				.status(200)
				.json({ message: '카테고리 조회에 성공했습니다.', allCategories });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 카테고리 등록
	registeCategoryName: async (
		req: Request,
		res: Response
	): Promise<Response> => {
		try {
			const admin = req.cookies;
			const { categoryName }: RegisteCategoryDTO = req.body;

			if (!categoryName) {
				return res
					.status(400)
					.json({ message: 'createCategory:category 값을 없습니다.' });
			}

			await categoryService.createCategory(admin.id, categoryName);
			return res
				.status(201)
				.json({ message: 'createCategory: 카테고리 등록이 완료되었습니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 카테고리 수정
	updateCategoryName: async (
		req: Request,
		res: Response
	): Promise<Response> => {
		try {
			const admin = req.cookies;
			const { id, updateCategoryName }: UpdateCategoryDTO = req.body;

			await categoryService.updateCategory(admin.id, id, updateCategoryName);

			return res.status(200).json({
				message: 'updateCategoryName: 카테고리 정보 수정에 성공했습니다.',
			});
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 카테고리 삭제
	eraseCategoryName: async (req: Request, res: Response): Promise<Response> => {
		try {
			const admin = req.cookies;
			const { id }: EraseCategoryDTO = req.body;

			await categoryService.deleteCategory(admin.i, id);
			return res.status(200).json({
				message: 'eraseCategoryName: 카테고리 삭제에 성공했습니다.',
			});
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};
