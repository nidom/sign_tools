import { SharedEntity} from "src/general/base.entity";
import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ff_user')
export class  UserEntity extends SharedEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'in_userid',
    comment: '主键id',
  })
  id!: number;
  @Column({ length: 50, comment: '用户名' })
  in_username: string;

  @Column({ length: 100, comment: '用户邮箱' })
  in_mail: string;

  @Column({ length: 11, comment: '超级签名剩余量' })
  device_num: number;

  @Column({ length: 11, comment: '超级签名已使用' })
  device_used: number;


}
