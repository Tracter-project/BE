import { Router } from 'express';
import { commentController } from './CommentController';

export const commentRouter = Router();

// 댓글 등록
commentRouter.post('/comments', commentController.registeComment);
// 댓글 수정
commentRouter.patch('/comments', commentController.updateComment);
// 댓글 삭제
commentRouter.delete('/comments', commentController.eraseComment);
