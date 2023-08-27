import { DeleteResult, UpdateResult } from 'typeorm';
import { Article, subjectEnum } from './ArticleEntity';

export const articleService = {
	// 글 등록
	createArticle: async (
		subject: subjectEnum,
		writer: string,
		title: string,
		contents: string
	): Promise<Article> => {
		try {
			const newArticle: Article = new Article();
			newArticle.subject = subject;
			newArticle.writer = writer;
			newArticle.title = title;
			newArticle.contents = contents;
			return newArticle.save();
		} catch (error) {
			throw new Error('createArticle: 게시글 등록에 실패했습니다.');
		}
	},
	// 게시글 검색(id)
	getArticleById: async (id: number): Promise<Article | null> => {
		return await Article.findOne({ where: { id } });
	},
	// 게시글 전체 조회
	getAllArticleName: async (): Promise<Article[]> => {
		return await Article.find();
	},
	// 게시글 수정
	updateArticle: async (
		id: number,
		subject: subjectEnum,
		title: string,
		contents: string
	): Promise<UpdateResult> => {
		try {
			const article = await articleService.getArticleById(id);

			if (!article) {
				throw new Error('updateArticle: 게시글을 찾을 수 없습니다.');
			}
			article.subject = subject;
			article.title = title;
			article.contents = contents;

			return Article.update({ id }, { subject, title, contents });
		} catch (error) {
			throw new Error('updateArticle: 게시글 수정에 실패했습니다.');
		}
	},
	// 게시글 삭제
	deleteArticle: async (id: number): Promise<DeleteResult> => {
		try {
			const deleteResult = await Article.delete({ id });

			if (deleteResult.affected === 0) {
				throw new Error('deleteArticle: 삭제할 게시글이 존재하지 않습니다.');
			}

			return deleteResult;
		} catch (error) {
			throw new Error('deleteCategory: 카테고리 삭제에 실패했습니다.');
		}
	},
};
