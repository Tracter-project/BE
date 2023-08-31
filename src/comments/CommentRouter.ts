import { Router } from 'express';
import { commentController } from './CommentController';
import { tokenAuth } from '../middlewares/tokenAuthMiddleWare';

export const commentRouter = Router();

// 댓글 등록 (인증 필요)
commentRouter.post('/comments', tokenAuth, commentController.registeComment);
// 댓글 수정 (인증 필요)
commentRouter.patch('/comments', tokenAuth, commentController.updateComment);
// 댓글 삭제 (인증 필요)
commentRouter.delete('/comments', tokenAuth, commentController.eraseComment);
// 댓글 조회 (인증 필요)
commentRouter.get('/comments', tokenAuth, commentController.searchComment);
