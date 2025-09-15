import { SharedEntity} from "src/general/base.entity";
import { Entity, Column, Index } from 'typeorm';
@Entity('ff_config')
export class  SignConfigEntity extends SharedEntity {

  @Column({ length: 50, comment: 'name' })
  name: string;

  @Column({ length: 500, comment: 'value' })
  value: string;

}
