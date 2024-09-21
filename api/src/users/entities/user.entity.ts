import { ApiProperty } from '@nestjs/swagger';
import { ModComment } from 'src/mods/entities/mod-comment.entity';
import { ModReview } from 'src/mods/entities/mod-review.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
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
  @Column({ nullable: true })
  avatar: string;

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

  @OneToMany(() => ModReview, (review) => review.author)
  reviews: ModReview[];

  @OneToMany(() => ModComment, (comment) => comment.author)
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
