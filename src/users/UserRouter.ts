import { Router } from 'express';
import { tokenAuth } from '../middlewares/tokenAuthMiddleWare';
import { userController } from './UserController';

export const userRouter: Router = Router();

// 회원가입
userRouter.post('/users', userController.registeUser);
// 로그인
userRouter.post('/login', userController.userLogin);
// 이메일 중복 체크
userRouter.get('/users/validator/:email', userController.validatorEmail);
// 닉네임 중복 체크
userRouter.get('/users/validator/:nickname', userController.validatorNickname);
// 회원 정보 조회 (인증 필요)
userRouter.get('/users', tokenAuth, userController.getUserInformation);
// 회원 정보 수정 (인증 필요)
userRouter.patch('/users', tokenAuth, userController.updateProfile);
// 회원 탈퇴 (인증 필요)
userRouter.delete('/users', tokenAuth, userController.withdrawUser);

// 관리자 인증 (관리자 인증 필요 --> 생각나는대라)
// userRouter.get('/admin', tokenAuth, adminAuth);
