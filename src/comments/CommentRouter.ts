import { Router } from 'express';
import commentController from './CommentController';

const commentRouter = Router();

// 댓글 등록
commentRouter.post(commentController.registComment);
// 댓글 수정
commentRouter.patch(commentController.updateComment);
// 댓글 삭제
commentRouter.delete(commentController.deleteComment);