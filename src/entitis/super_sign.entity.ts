import { SharedEntity} from "src/general/base.entity";
import { Entity, Column, Index } from 'typeorm';
@Entity('ff_super_sign')
export class  SuperSignEntity extends SharedEntity {

  @Column({ length: 50, comment: 'udid' })
  udid: string;

  @Column({ length: 200, comment: 'udid' })
  cert_iss: string;



}
