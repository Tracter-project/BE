import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Post } from '../posts/PostEntity';
import { User } from '../users/UserEntity';
import { Base } from '../entities/BaseEntity';

@Entity('comments')
export class Comment extends Base {
	@Column('int', { nullable: false })
	@ManyToOne(() => Post)
	@JoinColumn({ name: 'post_id' })
	postId: number;

	@Column('int', { nullable: false })
	@OneToOne(() => User)
	@JoinColumn({ name: 'user_id' })
	writer: number;

	@Column('varchar', { nullable: false })
	comment: string;
}
