import express from 'express';
import cors from 'cors';
import { router } from './router';
import multer from 'multer';

export const server = express();

// CORS 에러 방지
server.use(cors());
// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
server.use(express.urlencoded({ extended: false }));
// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
server.use(express.json());

// 이미지 파일 업로드 미들웨어 사용
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Router 사용
server.use(router);
