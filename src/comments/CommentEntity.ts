import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Article } from '../articles/ArticleEntity';
import { User } from '../users/UserEntity';
import { Base } from '../entities/BaseEntity';

@Entity('comments')
export class Comment extends Base {
	@ManyToOne(() => Article, article => article.comments)
	@JoinColumn({ name: 'article_id' })
	articleId: Article;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	writer: User;

	@Column('varchar', { nullable: false })
	comment: string;
}
