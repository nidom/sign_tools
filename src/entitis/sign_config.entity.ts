import { SharedEntity} from "src/general/base.entity";
import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ff_config')
export class  SignConfigEntity extends SharedEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id!: number;
  @Column({ length: 50, comment: 'name' })
  name: string;

  @Column({ length: 500, comment: 'value' })
  value: string;

}
