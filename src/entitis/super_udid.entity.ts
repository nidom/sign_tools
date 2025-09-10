import { SharedEntity} from "src/general/base.entity";
import { Entity, Column, Index } from 'typeorm';
@Entity('ff_super_udid')
export class  SuperUDIDEntity extends SharedEntity {

  @Column({ length: 50, comment: 'udid' })
  udid: string;


}
