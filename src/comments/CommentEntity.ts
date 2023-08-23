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
import { PostEntity } from '../posts/PostEntity';
import { UserEntity } from '../users/UserEntity';

@Entity()
export class CommentEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	@ManyToOne(() => PostEntity)
	@JoinColumn({ name: 'post_id' })
	postId: number;

	@Column({ nullable: false })
	@OneToOne(() => UserEntity)
	@JoinColumn({ name: 'user_id' })
	writer: number;

	@Column({ nullable: false })
	comment: string;

	// @CreateDateColumn({
	// 	type: 'datetime',
	// 	default: () => 'CURRENT_TIMESTAMP()',
	// })
	// createdAt: Date;

	// @UpdateDateColumn({
	// 	type: 'datetime',
	// 	default: () => 'CURRENT_TIMESTAMP()',
	// 	onUpdate: 'CURRENT_TIMESTAMP()',
	// })
	// updatedAt: Date;
}
