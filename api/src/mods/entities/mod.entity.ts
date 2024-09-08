import { ApiProperty } from '@nestjs/swagger';
import { Game } from 'src/games/entities/game.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Mod {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column()
  doc: string;

  @ApiProperty()
  @Column({ default: true })
  isFree: boolean;

  @ApiProperty()
  @Column({ default: false })
  withLicenseKey: boolean;

  @ApiProperty()
  @Column({ default: 0, nullable: true })
  price: number;

  @ApiProperty()
  @Column()
  gameId: string;

  @OneToOne(() => Game)
  @JoinColumn({ name: 'gameId' })
  game: Game;

  @ApiProperty()
  @Column()
  authorId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'authorId' })
  author: User;

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
