import { Booking } from '../../bookings/entities/booking.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['email', 'booking'])
export class Attendance {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column({ length: 500 })
    email: string;

    @ApiProperty()
    @Column({ length: 100, name: "first_name" })
    firstName: string;

    @ApiProperty()
    @Column({ length: 100, name: "last_name" })
    lastName: string;

    @ApiProperty()
    @Column({ length: 15 })
    phone: string;

    @Column({name: "confirmation_code"})
    confirmationCode: string

    @ManyToOne(() => Booking, (booking: Booking) => booking.attendances, {
        onDelete: 'CASCADE',
    })
    booking: Booking;
}
