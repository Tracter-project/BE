import { Entity, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';

import { User } from '../users/UserEntity';
import { Comment } from '../comments/CommentEntity';
import { Base } from '../entities/BaseEntity';

enum subjectEnum {
	REVIEW = '후기',
	QUESTION = '질문',
	ETC = '기타',
}

@Entity('posts')
export class Post extends Base {
	@Column({
		type: 'enum',
		enum: subjectEnum,
	})
	subject: subjectEnum;

	@Column({ nullable: false })
	@OneToOne(() => User, user => user.id)
	@JoinColumn({ name: 'user_id' })
	writer: number;

	@Column({ nullable: false })
	title: string;

	@Column()
	contents: string;

	@Column({ default: 0 })
	postLikeCount: number;

	@Column('simple-array')
	@OneToMany(() => Comment, comment => comment.id)
	@JoinColumn({ name: 'comment_id' })
	comments: string[];

	// @Column('simple-array', { nullable: true })
	// @ManyToMany(() => User)
	// @JoinTable({
	// 	name: 'likes',
	// 	joinColumn: {
	// 		name: 'post_id',
	// 	},
	// 	inverseJoinColumn: {
	// 		name: 'user_id',
	// 	},
	// })
	// usersWhoLikedPost: User[];
}
