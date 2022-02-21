import { ApiProperty } from '@nestjs/swagger';
import { Attendance } from '../../attendances/entities/attendance.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Booking {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ length: 500, unique: true })
    name: string;

    @OneToMany(() => Attendance, attendance => attendance.booking, {
        cascade: true,
    })
    attendances: Attendance[];  
}
