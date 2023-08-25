import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1692781198020 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query("DROP TABLE 'category_entity'");
		await queryRunner.query("DROP TABLE 'category_table'");
		await queryRunner.query("DROP TABLE 'comment_entity'");
		await queryRunner.query("DROP TABLE 'comment_table'");
		await queryRunner.query("DROP TABLE 'place_entity'");
		await queryRunner.query("DROP TABLE 'place_table'");
		await queryRunner.query("DROP TABLE 'post_entity'");
		await queryRunner.query("DROP TABLE 'post_table'");
		await queryRunner.query("DROP TABLE 'user_entity'");
		await queryRunner.query("DROP TABLE 'user_table'");
	}

	public async down(queryRunner: QueryRunner): Promise<void> {}
}
