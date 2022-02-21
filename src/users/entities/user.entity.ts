import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500, unique: true })
    email: string;

    @Column({ length: 500 })
    password: string;
}
