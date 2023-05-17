import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  IsUUID,
  CreatedAt,
  UpdatedAt,
  HasOne,
  IsIn,
  Default
} from 'sequelize-typescript';
import { Book } from '@models/Book';
import { User } from '@models/User';

@Table
export class Order extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @HasOne(() => User)
  user?: User;

  @HasOne(() => Book)
  book?: Book;

  @Column(DataType.STRING)
  @IsIn({ msg: 'Must be one of the following...', args: [['pending', 'confirmed', 'canceled']] })
  @Default('pending')
  status!: string;

  @Column(DataType.DOUBLE)
  totalAmount?: number;

  @CreatedAt
  creationDate?: Date;

  @UpdatedAt
  updatedOn?: Date;
}
