import { Base } from '../entities/BaseEntity';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('categories')
export class Category extends Base {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('varchar', { nullable: false })
	categoryName: string;
}
