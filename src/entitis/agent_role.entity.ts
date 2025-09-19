import { SharedEntity } from "src/general/base.entity";
import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('agent_role')
export class AgentRoleEntity extends SharedEntity {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id!: number;

  @Column({ 
    type: 'varchar', 
    length: 10, 
    name: 'role_id',
    comment: '角色id' 
  })
  role_id: string;

  @Column({ 
    type: 'varchar', 
    length: 70, 
    name: 'email',
    comment: '用户邮箱' 
  })
  email: string;

  @Column({ 
    type: 'varchar', 
    length: 32, 
    name: 'password',
    comment: '用户密码md5' 
  })
  password: string;

  @Column({ 
    type: 'varchar', 
    length: 100, 
    name: 'note',
    default: '',
    comment: '备注' 
  })
  note: string;

  @Column({ 
    type: 'varchar', 
    length: 10, 
    name: 'status',
    default: 'normal',
    comment: '状态,normal 正常,ban 封禁' 
  })
  status: string;

  @Column({ 
    type: 'int', 
    name: 'super_balance',
    default: 0,
    comment: '超级签名剩余量 是整数' 
  })
  super_balance: number;

  @Column({ 
    type: 'int', 
    name: 'dis_balance',
    default: 0,
    comment: '分发剩余量 是整数' 
  })
  dis_balance: number;
}
