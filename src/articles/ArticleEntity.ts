import {
	Entity,
	Column,
	OneToMany,
	OneToOne,
	JoinColumn,
	ManyToOne,
} from 'typeorm';
import { Base } from '../entities/BaseEntity';
import { User } from '../users/UserEntity';
import { Comment } from '../comments/CommentEntity';
import { UserLikeArticles } from '../entities/UserLikeArticlesEntity';

export enum subjectEnum {
	REVIEW = '후기',
	QUESTION = '질문',
	ETC = '기타',
}

@Entity('articles')
export class Article extends Base {
	@Column({
		type: 'enum',
		enum: subjectEnum,
	})
	subject: subjectEnum;

	@Column('varchar', { nullable: false })
	writer: string;

	@Column({ nullable: false })
	title: string;

	@Column()
	contents: string;

	@Column({ default: 0 })
	articleLikeCount: number;

	@OneToMany(() => Comment, comment => comment.id)
	@JoinColumn({ name: 'comment_id' })
	comments: Comment[];

	@Column({ nullable: true })
	placeImage: string;

	@OneToMany(
		() => UserLikeArticles,
		userLikeArticles => {
			userLikeArticles.user;
		}
	)
	likedArticles: number;
}
