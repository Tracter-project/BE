import express, { Request, Response, NextFunction } from 'express';
import { server } from './src/server';
import { connectDB } from './src/db';
import dotenv from 'dotenv';
import { router } from './src/router';

dotenv.config();

// DB 연결 방법(mysql 사용)
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
const port = process.env.PORT;

// run sever
server.listen(port, () => {
	console.log(`Server listening on ${port}`);
});
