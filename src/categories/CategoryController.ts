import { Request, Response } from 'express-serve-static-core';
import { categoryService } from './CategoryService';
import { ICategory } from './CategorySchema';

export const categoryController = {
	getCategoryNameList: async (req: Request, res: Response): Promise<void> => {},
	createCategory: async (req: Request, res: Response): Promise<void> => {},
	updateCategoryName: async (req: Request, res: Response): Promise<void> => {},
	deleteCategoryName: async (req: Request, res: Response): Promise<void> => {},
};
