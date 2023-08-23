import express, { Request, Response, NextFunction } from 'express';
import { connectDB } from './src/db';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

app.use(express.urlencoded({ extended: false })); // Content-Type: application/x-www-form-urlencoded 형태의 데이터를 인식하고 핸들링할 수 있게 함
app.use(express.json()); // Content-Type: application/json 형태의 데이터를 인식하고 핸들링할 수 있게 함

// DB 연결 mongoose 사용시
// connectDB();

// DB 연결 mysql 사용시
// 1. mysql.server start 실행후 서버 실행해야함
// 2. CREATE DATABASE tracter로 DB 만들기 (처음에 한번만 작성)
// 3. .env 파일 꼭확인하기 - 아래는 .env안에 들어갈 파일입니다!
// DB_HOST=127.0.0.1 (기본값)
// DB_USER=root (기본값)
// DB_PASSWORD=1312qq (임의 설정)
// DB_NAME=tracter (만들 테이블 이름)
// DB_PORT=3306 (기본값)

connectDB
	.initialize()
	.then(async () => {
		console.log('connecting DB success');
	})
	.catch(error => {
		console.error('Unable to connect to the database:', error);
	});

// PORT
const port: string = process.env.PORT as string;

// run sever
app.listen(port, () => {
	console.log(`Server listening on ${port}`);
});
