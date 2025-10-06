import { SharedEntity} from "src/general/base.entity";
import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';
@Entity('ff_appid')
export class  AppIDEntity extends SharedEntity {



  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'in_id',
    comment: '主键id',
  })
  in_id!: number;

  @Column({ length: 50, comment: 'udid' })
  in_link: string;


  @Column({ length: 50, comment: 'in_form' })
  in_form: string;

  @Column({ comment: 'kid' })
  in_kid: number;



}
