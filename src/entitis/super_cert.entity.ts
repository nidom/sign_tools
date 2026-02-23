
import { SharedEntity} from "src/general/base.entity";
import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';
@Entity('ff_super_cert')
export class  SuperCertEntity extends SharedEntity {
  
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id!: number;

  @Column({ length: 50, comment: 'iss' })
  iss: string;

  @Column({ comment: 'type' })
  type: number;

  @Column({ comment: '	status' })
  status: number;

}
