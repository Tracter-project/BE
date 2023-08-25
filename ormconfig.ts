import { Migration } from 'typeorm';

export const ormconfig = {
	type: 'mysql',
	host: '127.0.0.1',
	port: 3306,
	username: 'root',
	password: '1234',
	database: 'tracter',
	charset: 'utf8mb4_unicode_ci',
	timezone: '+09:00',
	synchronize: false,
	logging: ['warn', 'error'],
	entities: ['src/**/*.Entity.ts'],
	migrationsTableName: 'migration',
	migrations: ['src/migrations/**.ts'],
	cli: {
		migrationsDir: 'src/migrations',
		entitiesDir: 'src/**/*.Entity.ts',
	},
};
