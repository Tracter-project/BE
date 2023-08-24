import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { Category } from '../categories/CategoryEntity';

enum RegionEnum {
	SEOUL = '서울',
	GANGWON = '강원-강릉',
	JEOLLA = '전라-여수',
	GYEONGSANG = '경상-부산',
	JEJU = '제주',
}

@Entity('places')
export class Place {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('varchar', { nullable: false })
	placeName: string;

	@Column('varchar', { nullable: false })
	price: string;

	@Column('varchar', { nullable: false })
	description: string;

	@Column('varchar', { nullable: false })
	@ManyToOne(() => Category)
	@JoinColumn({ name: 'categoryId' })
	category: Category;

	@Column('enum', {
		enum: RegionEnum,
		default: RegionEnum.SEOUL,
		nullable: false,
	})
	region: RegionEnum;

	@Column('int', { default: 0 })
	placeLikeCount: number;

	@Column('varchar', { nullable: false })
	bannerImage: string;

	@Column('varchar', { nullable: false })
	mainImage: string;

	@Column('simple-array', { nullable: false })
	detailImage: string[];

	@Column('varchar', { nullable: false })
	bookingURL: string;
}
