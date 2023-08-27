import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';

import { User } from '../users/UserEntity';
import { Comment } from '../comments/CommentEntity';
import { Base } from '../entities/BaseEntity';

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

	@OneToOne(() => User, user => user.id)
	@JoinColumn({ name: 'user_id' })
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

	// @Column('simple-array', { nullable: true })
	// @ManyToMany(() => User)
	// @JoinTable({
	// 	name: 'likes',
	// 	joinColumn: {
	// 		name: 'article_id',
	// 	},
	// 	inverseJoinColumn: {
	// 		name: 'user_id',
	// 	},
	// })
	// usersWhoLikedArticle: User[];
}
