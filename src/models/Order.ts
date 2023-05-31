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
import Address from './Address';

@Table
export default class Order extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id!: string;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId!: string;

  @BelongsTo(() => User, 'userId')
  user!: User;

  @ForeignKey(() => Book)
  @Column(DataType.UUID)
  bookId!: string;

  @BelongsTo(() => Book, 'bookId')
  book!: Book;

  @ForeignKey(() => Address)
  @Column(DataType.UUID)
  addressId?: string;

  @BelongsTo(() => Address, 'addressId')
  address?: Address;

  @Column({
    type: DataType.ENUM('pending', 'confirmed', 'canceled'),
    defaultValue: 'pending'
  })
  status!: 'pending' | 'confirmed' | 'canceled';

  @Column(DataType.DOUBLE)
  totalAmount?: number;

  @Column(DataType.DOUBLE)
  shippingCost?: number;

  @CreatedAt
  creationDate?: Date;

  @UpdatedAt
  updatedOn?: Date;
}
