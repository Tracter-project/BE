import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1693163215065 implements MigrationInterface {
	name = 'Migration1693163215065';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('tracter');
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
