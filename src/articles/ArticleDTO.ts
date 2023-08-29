import { subjectEnum } from './ArticleEntity';

export class RegisteArticleDTO {
	subject: subjectEnum;
	writer: string;
	title: string;
	contents: string;
	placeImage: string;
}
export class UpdateArticleDTO {
	id: number;
	subject: subjectEnum;
	title: string;
	contents: string;
}
export class EraseArticleDTO {
	id: number;
}
export class LikeArticlesDTO {
	email: string;
	articleId: number;
}
