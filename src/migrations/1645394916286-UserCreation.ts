import { hashPassword } from "src/common/encryptPassword";
import {MigrationInterface, QueryRunner} from "typeorm";

export class UserCreation1645394916286 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const hashedPassword = await hashPassword(process.env.DEFAULT_ADMIN_PASSWORD);
        await queryRunner.query(`INSERT INTO public."user" (email, password) VALUES ('${process.env.DEFAULT_ADMIN_EMAIL}', '${hashedPassword}')`);
    }

    public async down(): Promise<void> {
        return;
    }

}
