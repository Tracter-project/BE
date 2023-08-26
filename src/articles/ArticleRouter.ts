import { Router } from 'express';
import { articleController } from './ArticleController';

export const articleRouter: Router = Router();

// 게시글 목록 조회
articleRouter.get('/articles', articleController.getAllArticles);
// 게시글 등록
articleRouter.post('/articles', articleController.registeArticle);
// 게시글 상세 조회
articleRouter.get('/articles/:articleId', articleController.getArticleDetail);
// 게시글 수정
articleRouter.patch('/articles/:articleId', articleController.updateArticle);
// 게시글 삭제
articleRouter.delete('/articles/:articleId', articleController.eraseArticle);
