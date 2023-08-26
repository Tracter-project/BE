import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	OneToMany,
	JoinColumn,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToMany,
	JoinTable,
} from 'typeorm';

import { Article } from '../articles/ArticleEntity';
import { Place } from '../places/PlaceEntity';
import { Base } from '../entities/BaseEntity';

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

	// @Column('simple-array', { nullable: true })
	// @ManyToMany(() => Place, place => place.id)
	// @JoinColumn({ name: 'place_id' })
	// likedPlaces: Place[];

	// @Column('simple-array', { nullable: true })
	// @ManyToMany(() => Article, article => article.id)
	// @JoinColumn({ name: 'id' })
	// likedArticles: Article[];

	@Column('enum', {
		enum: roleEnum,
		default: roleEnum.MEMBER,
	})
	role: roleEnum;

	@Column({ default: false })
	isDeleted: boolean;

	@Column('varchar', { nullable: true })
	@JoinColumn()
	token: string;

	// @Column('simple-array', { nullable: true })
	// @ManyToMany(() => Place)
	// @JoinTable({ name: 'likes' })
	// likedPlaces: Place[];

	// @Column('simple-array', { nullable: true })
	// @ManyToMany(() => Article)
	// @JoinTable({ name: 'likes' })
	// likedArticles: Article[];
}
