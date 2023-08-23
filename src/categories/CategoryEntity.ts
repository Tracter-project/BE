import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CategoryEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	categoryName: string;
}
