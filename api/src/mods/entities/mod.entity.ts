import { ApiProperty } from '@nestjs/swagger';
import { Game } from 'src/games/entities/game.entity';
import { Plateform } from 'src/plateforms/entities/plateform.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ModComment } from './mod-comment.entity';
import { ModReview } from './mod-review.entity';
import { ModVersion } from './mod-version.entity';

@Entity()
export class Mod {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ nullable: true })
  slug: string;

  @ApiProperty()
  @Column()
  description: string;

  @ApiProperty()
  @Column({ default: true })
  isFree: boolean;

  @ApiProperty()
  @Column({ default: false })
  withLicenseKey: boolean;

  @ApiProperty()
  @Column({ default: 0, nullable: true, type: 'decimal' })
  price: number;

  @ApiProperty()
  @Column()
  gameId: string;

  @ManyToOne(() => Game)
  @JoinColumn({ name: 'gameId' })
  game: Game;

  @ApiProperty()
  @Column({ nullable: true })
  plateformId: string;

  @ManyToOne(() => Plateform)
  @JoinColumn({ name: 'plateformId' })
  plateform: Game;

  @OneToMany(() => ModVersion, (version) => version.mod)
  versions: ModVersion[];

  @ApiProperty()
  @Column()
  authorId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'authorId' })
  author: User;

  @OneToMany(() => ModReview, (review) => review.mod)
  reviews: ModReview[];

  @OneToMany(() => ModComment, (comment) => comment.mod)
  comments: ModComment[];

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
