import { ApiProperty } from '@nestjs/swagger';
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
import { ModPreview } from './mod-preview.entity';
import { Mod } from './mod.entity';

export enum ModVersionStatus {
  WAITING = 'WAITING',
  VALID = 'VALID',
  REJECT = 'REJECT',
}

@Entity()
export class ModVersion {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  file: string;

  @ApiProperty()
  @Column({
    type: 'enum',
    enum: ModVersionStatus,
    default: ModVersionStatus.WAITING,
  })
  status: ModVersionStatus;

  @ApiProperty()
  @Column({ default: '1.00' })
  version: string;

  @ApiProperty()
  @Column({ default: 'http://', nullable: true })
  scan_link: string;

  @OneToMany(() => ModPreview, (preview) => preview.modVersion)
  previews: ModPreview[];

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
