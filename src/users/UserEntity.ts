import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
} from 'typeorm';

import { Post } from '../posts/PostEntity';
import { Place } from '../places/PlaceEntity';
import { Base } from '../BaseEntity';

enum roleEnum {
	ADMIN = 'admin',
	MEMBER = 'member',
}

@Entity('users')
export class User extends Base {
	@Column('varchar', { nullable: false })
	email: string;

	@Column('varchar', { nullable: false })
	nickname: string;

	@Column('varchar', { nullable: false })
	password: string;

	// manytomnay -> like테이블 만들기
	@Column('simple-array', { nullable: true })
	@ManyToMany(() => Place, place => place.id)
	@JoinColumn({ name: 'place_id' })
	likedPlaces: Place[];

	@Column('simple-array', { nullable: true })
	@ManyToMany(() => Post, post => post.id)
	@JoinColumn({ name: 'id' })
	likedPosts: Post[];

	@Column('enum', {
		enum: roleEnum,
		default: roleEnum.MEMBER,
	})
	role: roleEnum;

	@Column({ default: false })
	isDeleted: boolean;

	@Column('varchar', { nullable: true })
	token: string;
}
