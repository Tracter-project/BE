import express from 'express';
import CommentController from './CommentController';

const commentRouter = express.Router();
const commentController = new CommentController;

// 댓글 등록
commentRouter.post(commentController.registComment);
// 댓글 수정
commentRouter.patch(commentController.updateComment);
// 댓글 삭제
commentRouter.delete(commentController.deleteComment);