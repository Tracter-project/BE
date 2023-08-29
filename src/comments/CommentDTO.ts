export class RegisteCommentDTO {
	articleId: number;
	comment: string;
}

export class UpdateCommentDTO {
	id: number;
	comment: string;
}

export class EraseCommentDTO {
	id: number;
}
