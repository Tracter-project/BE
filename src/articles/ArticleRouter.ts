import { Router } from 'express';
import { tokenAuth } from '../middlewares/tokenAuthMiddleWare';
import { articleController } from './ArticleController';

export const articleRouter: Router = Router();

// 게시글 목록 조회
articleRouter.get('/articles', articleController.getAllArticles);
// 게시글 상세 조회
articleRouter.get('/articles/:articleId', articleController.getArticleDetail);
// 게시글 등록 (인증 필요)
articleRouter.post('/articles', tokenAuth, articleController.registeArticle);
// 게시글 수정 (인증 필요)
articleRouter.patch('/articles', tokenAuth, articleController.updateArticle);
// 게시글 삭제 (인증 필요)
articleRouter.delete('/articles', tokenAuth, articleController.eraseArticle);
// 숙소 좋아요 (인증 필요)
articleRouter.post('/articles/likes', tokenAuth, (req, res) =>
	articleController.handleLikeArticles(req, res, true)
);
// 숙소 좋아요 취소 (인증 필요)
articleRouter.delete('/articles/likes', tokenAuth, (req, res) =>
	articleController.handleLikeArticles(req, res, false)
);
