import { Router } from 'express';
import { tokenAuth } from '../middlewares/tokenAuthMiddleWare';
import { userController } from './UserController';

export const userRouter: Router = Router();

// 회원가입
userRouter.post('/users', userController.registeUser);
// 회원 정보 조회
userRouter.get('/users', userController.getUserInformation);
// 로그인
userRouter.post('/login', userController.userLogin);
// 회원 정보 수정
userRouter.patch('/users', userController.updateProfile);
// 이메일 중복 체크
userRouter.get('/users/validator/email', userController.validatorEmail);
// 닉네임 중복 체크
userRouter.get('/users/validator/nickname', userController.validatorNickname);
// 회원 탈퇴
userRouter.delete('/users', userController.withdrawUser);

// 좋아요(place)
// userRouter.post('/users/like/place', userController.likePlace);
// 좋아요 취소(place)
// userRouter.patch('/users/like/place', userController.unlikePlace);
// // 좋아요(article)
// userRouter.article('/users/like/article', userController.likeArticle);
// // 좋아요 취소(article)
// userRouter.patch('/users/like/article', userController.unlikeArticle);
