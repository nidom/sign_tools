import { SharedEntity} from "src/general/base.entity";
import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';
@Entity('ff_ios_device')
export class  IOSDeviceEntity extends SharedEntity {



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

}
