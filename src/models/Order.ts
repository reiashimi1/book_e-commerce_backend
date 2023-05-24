import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  IsUUID,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey
} from 'sequelize-typescript';
import Book from './Book';
import User from './User';

@Table
export default class Order extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id!: number;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId!: number;

  @BelongsTo(() => User, 'id')
  user!: User;

  @BelongsTo(() => Book, 'id')
  book!: Book;

  @Column(DataType.ENUM('pending', 'confirmed', 'canceled'))
  status!: 'pending' | 'confirmed' | 'canceled';

  @Column(DataType.DOUBLE)
  totalAmount?: number;

  @CreatedAt
  creationDate?: Date;

  @UpdatedAt
  updatedOn?: Date;
}
