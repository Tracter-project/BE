import { DeleteResult, UpdateResult } from 'typeorm';
import { Category } from './CategoryEntity';
import { userService } from '../users/UserService';

export const categoryService = {
	// 카테고리 중복 검사
	isDuplicateCategoryName: async (categoryName: string): Promise<boolean> => {
		return (await Category.findOne({ where: { categoryName } })) ? true : false;
	},
	// 카테고리 검색(ID)
	getCategoryById: async (id: number): Promise<Category | null> => {
		return await Category.findOne({ where: { id } });
	},
	// 카테고리 검색 (categoryName)
	getCateogryByName: async (categoryName: string): Promise<Category[]> => {
		return await Category.find({ where: { categoryName } });
	},

	// 카테고리 전체 조회
	getAllCategoryName: async (): Promise<Category[]> => {
		return await Category.find();
	},
	// 카테고리 등록
	createCategory: async (
		userId: number,
		categoryName: string
	): Promise<Category> => {
		try {
			const isAdmin = await userService.getUserById(userId);

			if (!isAdmin) {
				throw new Error(
					'createCategory: 관리자만 카테고리를 등록할 수 있습니다.'
				);
			}

			const isDuplicateCategoryName: boolean =
				await categoryService.isDuplicateCategoryName(categoryName);

			if (isDuplicateCategoryName) {
				throw new Error('createCategory: 이미 등록되어 있는 카테고리 입니다.');
			}

			const newCategory: Category = new Category();
			newCategory.categoryName = categoryName;

			return Category.save(newCategory);
		} catch (error) {
			throw new Error(error.message);
		}
	},
	// 카테고리 수정
	updateCategory: async (
		userId: number,
		id: number,
		updateCategoryName: string
	): Promise<UpdateResult> => {
		try {
			const isAdmin = await userService.getUserById(userId);

			if (!isAdmin) {
				throw new Error(
					'createCategory: 관리자만 카테고리를 등록할 수 있습니다.'
				);
			}
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
			throw new Error(error.message);
		}
	},
	// 카테고리 삭제
	deleteCategory: async (userId: number, id: number): Promise<DeleteResult> => {
		try {
			const isAdmin = await userService.getUserById(userId);

			if (!isAdmin) {
				throw new Error(
					'createCategory: 관리자만 카테고리를 등록할 수 있습니다.'
				);
			}
			const deleteResult = await Category.delete({ id });

			if (deleteResult.affected === 0) {
				throw new Error('deleteCategory: 삭제할 카테고리가 존재하지 않습니다.');
			}

			return deleteResult;
		} catch (error) {
			throw new Error(error.message);
		}
	},
};
