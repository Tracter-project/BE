import { Router } from 'express';
import { userRouter } from './users/UserRouter';
import { articleRouter } from './articles/ArticleRouter';
import { placeRouter } from './places/PlaceRouter';
import { commentRouter } from './comments/CommentRouter';
import { categoryRouter } from './categories/CategoryRouter';

export const router = Router();

router.use('/api', userRouter);
router.use('/api', articleRouter);
router.use('/api', commentRouter);
router.use('/api', placeRouter);
router.use('/api', categoryRouter);
