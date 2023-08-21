import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
// import.meta.url이 오류가 생기는데 해결방법을 모르겠음...!
// const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const viewsRouter = express.Router();

// 페이지별로 html, css, js 파일들 라우팅
viewsRouter.use('/', serveStatic('index'));

// // views 폴더의 최상단 파일 (사진, favicon 등) 라우팅

// views폴더 내의 ${resource} 폴더 내의 모든 파일을 웹에 띄우며,
// 이 때 ${resource}.html 을 기본 파일로 설정함.
function serveStatic(resource) {
	const resourcePath = path.join(__dirname, `../../views/${resource}`);
	const option = { index: `${resource}.html` };
	// console.log(__dirname);
	console.log(resourcePath, option);

	return express.static(resourcePath, option);
}
