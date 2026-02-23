// INSERT_YOUR_CODE
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { SharedEntity } from "src/general/base.entity";

@Entity('udid_stuck')
export class UdidStuckEntity extends SharedEntity {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id!: number;

  @Column({ type: 'varchar', length: 100, comment: 'udid' })
  udid: string;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', comment: '创建时间' })
  created_at: Date;


}