import { SharedEntity } from "src/general/base.entity";
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tw_domain')
export class TwDomainEntity extends SharedEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id!: number;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'domain',
    comment: '域名',
  })
  domain: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'ip',
    comment: 'ip',
  })
  ip: string;
}
