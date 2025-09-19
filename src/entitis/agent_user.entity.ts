import { SharedEntity } from "src/general/base.entity";
import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('agent_user')
export class AgentUserEntity extends SharedEntity {

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id!: number;

  @Column({ 
    type: 'varchar', 
    length: 10, 
    name: 'agent_id',
    comment: '代理 role_id' 
  })
  agent_id: string;

  @Column({ 
    type: 'int', 
    name: 'user_id',
    default: 0,
    comment: '用户id,是整数' 
  })
  user_id: number;

  @Column({ 
    type: 'varchar', 
    length: 100, 
    name: 'note',
    default: '',
    comment: '备注' 
  })
  note: string;
}
