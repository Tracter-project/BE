import express from "express";
import UserController from './UserController';

const userRouter = express.Router();
const userController = new UserController;
 
// 회원가입
userRouter.post('/users', userController.registeUser);
// 회원 정보 조회
userRouter.get('/users', userController.OpenProfile);
// 로그인
userRouter.post('/login', userController.Login);
// 회원 정보 수정
userRouter.patch('/users', userController.updateProfile);
// 이메일 중복 체크
userRouter.get('/users/validator/email', userController.validatorEmail);
// 닉네임 중복 체크
userRouter.get('/users/validator/nickname', userController.validatorNickNmae);
// 회원 탈퇴
userRouter.delete('users', userController.withdrawUser);

export default userRouter;