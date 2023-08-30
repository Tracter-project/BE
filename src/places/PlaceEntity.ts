import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Category } from '../categories/CategoryEntity';
import { Base } from '../entities/BaseEntity';
import { Image } from '../entities/ImagesEntity';
import { UserLikePlaces } from '../entities/UserLikePlacesEntity';

export enum RegionEnum {
	SEOUL = '서울',
	GANGWON = '강원',
	JEOLLA = '전라',
	GYEONGSANG = '경상',
	JEJU = '제주',
}

@Entity('places')
export class Place extends Base {
	@Column('varchar', { nullable: false })
	placeName: string;

	@Column('varchar', { nullable: false })
	price: string;

	@Column('varchar', { nullable: false })
	description: string;

	@Column('varchar', { nullable: false })
	category: string;

	@Column('enum', {
		enum: RegionEnum,
		default: RegionEnum.SEOUL,
		nullable: false,
	})
	region: RegionEnum;

	@Column('int', { default: 0 })
	placeLikeCount: number;

	@Column('varchar', { nullable: true })
	bannerImage: string;

	@Column('varchar', { nullable: false })
	mainImage: string;

	@Column('simple-array', { nullable: true })
	detailImage: string[];

	@Column('varchar', { nullable: false })
	bookingURL: string;

	@OneToMany(() => Image, image => image.place)
	images: Image[];

	@OneToMany(
		() => UserLikePlaces,
		userLikePlace => {
			userLikePlace.user;
		}
	)
	likedPlaces: number;
}
