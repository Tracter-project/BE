import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	CreateDateColumn,
	UpdateDateColumn,
	JoinColumn,
} from 'typeorm';
import { PostEntity } from '../posts/PostEntity';
import { PlaceEntity } from '../places/PlaceEntity';

enum role {
	admin = 'admin',
	member = 'member',
}

@Entity()
export class UserEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	email: string;

	@Column({ nullable: false })
	nickname: string;

	@Column({ nullable: false })
	password: string;

	@Column('simple-array')
	@OneToMany(() => PlaceEntity, place => place.id)
	@JoinColumn({ name: 'place_id' })
	likedPlaces: PlaceEntity[];

	@Column('simple-array')
	@OneToMany(() => PostEntity, post => post.id)
	@JoinColumn({ name: 'post_id' })
	likedPosts: PostEntity[];

	@Column({
		type: 'enum',
		enum: role,
		default: role.member,
	})
	role: role;

	@Column({ default: false })
	isDeleted: boolean;

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
