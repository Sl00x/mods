import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @Column({
    select: false,
  })
  password: string;

  @ApiProperty()
  @Column()
  firstname: string;

  @ApiProperty()
  @Column()
  lastname: string;

  @ApiProperty()
  @Column({ nullable: true, default: '#000 ' })
  color: string;

  @ApiProperty()
  @Column()
  phone: string;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updated_at: Date;

  @ApiProperty()
  @DeleteDateColumn()
  deleted_at: Date;
}
