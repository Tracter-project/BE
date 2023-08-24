import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToOne,
	CreateDateColumn,
	UpdateDateColumn,
	JoinColumn,
	ManyToOne,
} from 'typeorm';
import { Post } from '../posts/PostEntity';
import { User } from '../users/UserEntity';

@Entity('comments')
export class Comment {
	@PrimaryGeneratedColumn()
	id: number;

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
