import { DeleteResult, UpdateResult } from 'typeorm';
import { Category } from './CategoryEntity';

export const categoryService = {
	// 카테고리 중복 검사
	isDuplicateCategoryName: async (categoryName: string): Promise<boolean> => {
		return (await Category.findOne({ where: { categoryName } })) ? true : false;
	},
	// 카테고리 검색
	getCategoryById: async (id: number): Promise<Category | null> => {
		return await Category.findOne({ where: { id } });
	},
	// 카테고리 전체 조회
	getAllCategoryName: async (): Promise<Category[]> => {
		return await Category.find();
	},
	// 카테고리 등록
	createCategory: async (categoryName: string): Promise<Category> => {
		try {
			const isDuplicateCategoryName: boolean =
				await categoryService.isDuplicateCategoryName(categoryName);

			if (isDuplicateCategoryName) {
				throw new Error('createCategory: 이미 등록되어 있는 카테고리 입니다.');
			}

			const newCategory: Category = new Category();
			newCategory.categoryName = categoryName;

			return newCategory.save();
		} catch (error) {
			throw new Error('createCategory: 카테고리 등록에 실패했습니다.');
		}
	},
	// 카테고리 수정
	updateCategory: async (
		id: number,
		updateCategoryName: string
	): Promise<UpdateResult> => {
		try {
			const category = await categoryService.getCategoryById(id);

			if (!category) {
				throw new Error('updateCategory: 카테고리를 찾을 수 없습니다.');
			}
			if (category.categoryName !== updateCategoryName) {
				const isDuplicateCategoryName =
					await categoryService.isDuplicateCategoryName(updateCategoryName);

				if (isDuplicateCategoryName) {
					throw new Error('updateCategory: 사용 중인 카테고리 이름 입니다.');
				}
				category.categoryName = updateCategoryName;

				return Category.update({ id }, { categoryName: category.categoryName });
			}
			throw new Error('updateCategory: 동일한 카테고리 이름입니다.');
		} catch (error) {
			throw new Error('updateCategory: 카테고리 정보 수정에 실패했습니다.');
		}
	},
	// 카테고리 삭제
	deleteCategory: async (id: number): Promise<DeleteResult> => {
		try {
			const deleteResult = await Category.delete({ id });

			if (deleteResult.affected === 0) {
				throw new Error('deleteCategory: 삭제할 카테고리가 존재하지 않습니다.');
			}

			return deleteResult;
		} catch (error) {
			throw new Error('deleteCategory: 카테고리 삭제에 실패했습니다.');
		}
	},
};
