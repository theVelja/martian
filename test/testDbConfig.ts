import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Connection } from "typeorm";

export const testDbConfig = {
    type: "postgres",
    url: process.env.TEST_DATABASE_URL,
    synchronize: true,
    entities: ['./**/*.entity.ts'],
    dropSchema: true
} as TypeOrmModuleOptions;

export const clearDb = async (connection: Connection): Promise<void> => {
    await connection.dropDatabase();
    await connection.synchronize();
}