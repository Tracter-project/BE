import { Request, Response } from 'express';
import { articleService } from './ArticleService';
import { commentService } from '../comments/CommentService';
import {
	RegisteArticleDTO,
	UpdateArticleDTO,
	EraseArticleDTO,
	LikeArticlesDTO,
} from './ArticleDTO';
import { UserLikeArticles } from '../entities/UserLikeArticlesEntity';

export const articleController = {
	// 게시글 전체 조회
	getAllArticles: async (req: Request, res: Response): Promise<Response> => {
		try {
			const allArticle = await articleService.getAllArticleName();

			if (!allArticle) {
				return res.status(400).json({
					message: '게시글을 전체 조회할 수 없습니다.',
				});
			}
			return res.status(200).json(allArticle);
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 게시글 상세 조회
	getArticleDetail: async (req: Request, res: Response): Promise<Response> => {
		try {
			const { articleId } = req.params;
			const article = await articleService.getArticleById(Number(articleId));

			if (!article) {
				return res.status(400).json({ message: '게시글을 찾을 수 없습니다.' });
			}
			UserLikeArticles.find();
			const comment = await commentService.getCommentByArticleId(
				Number(articleId)
			);

			return res.status(200).json({ article, comment });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 게시글 등록
	registeArticle: async (req: Request, res: Response): Promise<Response> => {
		try {
			const user = req.cookies;
			const { subject, title, contents, placeImage }: RegisteArticleDTO =
				req.body;

			const writer = user.nickname;

			if (!subject || !title || !contents) {
				return res.status(400).json({ message: '누락된 값이 있습니다.' });
			}
			await articleService.createArticle(
				user.id,
				subject,
				title,
				contents,
				writer,
				placeImage
			);
			return res.status(201).json({ message: '게시글 등록에 성공했습니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 게시글 수정
	updateArticle: async (req: Request, res: Response): Promise<Response> => {
		try {
			const user = req.cookies;
			const { id, title, contents }: UpdateArticleDTO = req.body;

			await articleService.updateArticle(user.id, id, title, contents);

			return res.status(200).json({ message: '게시글 수정에 성공했습니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 게시글 삭제
	eraseArticle: async (req: Request, res: Response): Promise<Response> => {
		try {
			const user = req.cookies;
			const { id }: EraseArticleDTO = req.body;

			await articleService.deleteArticle(user.id, id);
			return res.status(200).json({ message: '게시글 삭제에 성공했습니다.' });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
	// 게시글 좋아요 처리
	handleLikeArticles: async (
		req: Request,
		res: Response,
		like: boolean
	): Promise<Response> => {
		try {
			const user = req.cookies;
			const { articleId }: LikeArticlesDTO = req.body;

			const article = await articleService.getArticleById(articleId);

			if (!user || !article) {
				return res.status(400).json({
					message: '게시글 좋아요 처리에 필요한 정보가 부족합니다.',
				});
			}

			await articleService.likeArticle(user, article, like);

			const message = like
				? '게시글 좋아요에 성공했습니다.'
				: '게시글 좋아요 취소에 성공했습니다.';

			return res.status(200).json({ message });
		} catch (error) {
			return res.status(500).json({ error: error.message });
		}
	},
};
