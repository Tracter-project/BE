import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	ManyToOne,
	JoinColumn,
} from 'typeorm';
import { CategoryEntity } from '../categories/CategoryEntity';

enum region {
	seoul = '서울',
	gangwon = '강원-강릉',
	jeolla = '전라-여수',
	Gyeongsang = '경상-부산',
	jeju = '제주',
}

@Entity()
export class PlaceEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	placeName: string;

	@Column({ nullable: false })
	price: string;

	@Column({ nullable: false })
	description: string;

	@Column({ nullable: false })
	@ManyToOne(() => CategoryEntity)
	@JoinColumn({ name: 'categoryId' })
	category: CategoryEntity;

	@Column({
		type: 'enum',
		enum: region,
		default: region.seoul,
		nullable: false,
	})
	region: region;

	@Column({ default: 0 })
	placeLikeCount: number;

	@Column({ nullable: false })
	bannerImage: string;

	@Column({ nullable: false })
	mainImage: string;

	@Column('simple-array', { nullable: false })
	detailImage: string[];

	@Column({ nullable: false })
	bookingURL: string;

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
