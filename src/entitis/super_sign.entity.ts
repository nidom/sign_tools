import { SharedEntity} from "src/general/base.entity";
import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';


//签名队列
@Entity('ff_super_sign')
export class  SuperSignEntity extends SharedEntity {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id!: number;
  @Column({ length: 50, comment: 'udid' })
  udid: string;

  @Column({ length: 200, comment: 'udid' })
  cert_iss: string;

  @Column({ comment: 'type' })
  type: number;

  @Column({ comment: '	status' })
  status: number;

  @Column({ comment: 'update_time' })
  update_time	: number;

  



}
