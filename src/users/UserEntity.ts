import { Entity, Column, JoinColumn, ManyToMany } from 'typeorm';
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

	@Column('enum', {
		enum: roleEnum,
		default: roleEnum.MEMBER,
	})
	role: roleEnum;

	@Column({ default: false })
	isDeleted: boolean;

	@ManyToMany(() => Place, place => place.id)
	@JoinColumn({ name: 'place_id' })
	likedPlaces: Place[];

	@ManyToMany(() => Article, article => article.id)
	@JoinColumn({ name: 'id' })
	likedArticles: Article[];
}
