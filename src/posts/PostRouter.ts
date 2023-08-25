import { Router } from 'express';
import { postController } from './PostController';

export const postRouter: Router = Router();

// 게시글 목록 조회
postRouter.get('/posts', postController.getAllPosts);
// 게시글 등록
postRouter.post('/posts', postController.createPost);
// 게시글 상세 조회
postRouter.get('/posts/:postId', postController.getPostById);
// 게시글 수정
postRouter.patch('/posts/:postId', postController.updatePost);
// 게시글 삭제
postRouter.delete('/posts/:postId', postController.deletePost);
