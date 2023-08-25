import Category, { ICategory } from './CategorySchema';

export const categoryService = {
	createCategory: async (categoryData: ICategory) => {
		try {
			const newCategory: ICategory = new Category(categoryData);
			return newCategory.save();
		} catch (error) {
			throw error;
		}
	},
};
