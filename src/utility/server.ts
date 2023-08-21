import express from 'express';
import cors from 'cors';
import nunjucks from 'nunjucks';
import { router } from './router';

export const server = express();

// view engine 설정 (nunjucks)
server.set('view engine', 'html');
nunjucks.confiugre('./views', {
	express: server,
});

// CORS 에러 방지
server.use(cors());
// Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
server.use(express.urlencoded({ extended: false }));
// Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함.
server.use(express.json());

// Router 사용
server.use('/api', router);
