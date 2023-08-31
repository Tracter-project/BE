import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Article } from '../articles/ArticleEntity';
import { Base } from '../entities/BaseEntity';

@Entity('comments')
export class Comment extends Base {
	@ManyToOne(() => Article, article => article.comments)
	@JoinColumn()
	article: Article;

	@Column('varchar', { nullable: false })
	writer: string;

	@Column('varchar', { nullable: false })
	comment: string;
}
