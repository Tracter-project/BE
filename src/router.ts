import { Router } from 'express';
import { userRouter } from './users/UserRouter';
import { articleRouter } from './articles/ArticleRouter';
import { placeRouter } from './places/PlaceRouter';
import { commentRouter } from './comments/CommentRouter';
import { categoryRouter } from './categories/CategoryRouter';
import { upload } from './middlewares/multerMiddleWare';

export const router = Router();

router.use('/api', userRouter);
router.use('/api', articleRouter);
router.use('/api', commentRouter);
router.use('/api', placeRouter);
router.use('/api', categoryRouter);

// 이미지 파일 업로드 미들웨어 사용
router.use('/api', upload.single('image'));
