import { Request, Response } from 'express';
import { articleService } from './ArticleService';
import {
	RegisteArticleDTO,
	UpdateArticleDTO,
	EraseArticleDTO,
} from './ArticleDTO';

export const articleController = {
	// 게시글 전체 조회
	getAllArticles: async (req: Request, res: Response): Promise<Response> => {
		try {
			const allArticle = await articleService.getAllArticleName();

			if (!allArticle) {
				return res.status(400).json({
					message: 'getAllArticles: 게시글을 전체 조회할 수 없습니다.',
				});
			}
			return res.status(200).json(allArticle);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 게시글 등록
	registeArticle: async (req: Request, res: Response): Promise<Response> => {
		const { subject, writer, title, contents, placeImage }: RegisteArticleDTO =
			req.body;
		try {
			if (!writer || !title) {
				return res
					.status(400)
					.json({ message: 'registeArticle:누락된 값이 있습니다.' });
			}
			await articleService.createArticle(
				subject,
				writer,
				title,
				contents,
				placeImage
			);
			return res
				.status(201)
				.json({ message: 'registeArticle:게시글이 등록되었습니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 게시글 상세 조회
	getArticleDetail: async (req: Request, res: Response): Promise<Response> => {
		try {
			const { id } = req.params;
			const article = await articleService.getArticleById(Number(id));

			if (!article) {
				return res
					.status(400)
					.json({ message: 'getArticleDetail: 게시글을 찾을 수 없습니다.' });
			}
			return res.status(200).json(article);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 게시글 수정
	updateArticle: async (req: Request, res: Response): Promise<Response> => {
		try {
			const { id, title, contents }: UpdateArticleDTO = req.body;

			await articleService.updateArticle(id, title, contents);

			return res
				.status(200)
				.json({ message: 'updateArticle: 게시글 수정에 성공했습니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 게시글 삭제
	eraseArticle: async (req: Request, res: Response): Promise<Response> => {
		try {
			const { id }: EraseArticleDTO = req.body;

			await articleService.deleteArticle(id);
			return res
				.status(200)
				.json({ message: 'eraseArticle: 게시글 삭제에 성공했습니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};
