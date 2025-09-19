// import { Transform, TransformFnParams } from 'class-transformer';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';

export class SharedEntity extends BaseEntity {


  // // @Transform((row: TransformFnParams) => +new Date(row.value))
  // @CreateDateColumn({
  //   type: 'timestamp',
  //   nullable: false,
  //   name: 'created_at',
  //   comment: '创建时间',
  // })
  // createdAt!: Date;

  // // @Transform((row: TransformFnParams) => +new Date(row.value))
  // @UpdateDateColumn({
  //   type: 'timestamp',
  //   nullable: false,
  //   name: 'updated_at',
  //   comment: '更新时间',
  // })
  // updatedAt!: Date;

}
