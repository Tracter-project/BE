import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Article } from '../articles/ArticleEntity';
import { User } from '../users/UserEntity';
import { Base } from '../entities/BaseEntity';

@Entity('comments')
export class Comment extends Base {
	@Column('int', { nullable: false })
	@ManyToOne(() => Article, article => article.comments)
	@JoinColumn({ name: 'article_id' })
	articleId: Article;

	@Column('int', { nullable: false })
	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	writer: number;

	@Column('varchar', { nullable: false })
	comment: string;
}
