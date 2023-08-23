import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	OneToOne,
	CreateDateColumn,
	UpdateDateColumn,
	JoinColumn,
} from 'typeorm';

import { UserEntity } from '../users/UserEntity';
import { CommentEntity } from '../comments/CommentEntity';

enum subject {
	review = '후기',
	question = '질문',
	etc = '기타',
}

@Entity()
export class PostEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'enum',
		enum: subject,
	})
	subject: subject;

	@Column({ nullable: false })
	@OneToOne(() => UserEntity, user => user.id)
	@JoinColumn({ name: 'user_id' })
	writer: number;

	@Column({ nullable: false })
	title: string;

	@Column()
	contents: string;

	@Column({ default: 0 })
	postLikeCount: number;

	@Column('simple-array')
	@OneToMany(() => CommentEntity, comment => comment.id)
	@JoinColumn({ name: 'comment_id' })
	comments: CommentEntity[];

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
