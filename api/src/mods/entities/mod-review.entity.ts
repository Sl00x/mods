import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Mod } from './mod.entity';

@Entity()
@Index(['authorId', 'modId'], { unique: true })
export class ModReview {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  note: number;

  @ApiProperty()
  @Column()
  authorId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @ApiProperty()
  @Column()
  modId: string;

  @ManyToOne(() => Mod)
  @JoinColumn({ name: 'modId' })
  mod: Mod;

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
