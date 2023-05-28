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
  ForeignKey,
  HasOne
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

  @BelongsTo(() => User, 'id')
  user!: User;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  bookId!: string;

  @BelongsTo(() => Book, 'id')
  book!: Book;

  @Column(DataType.STRING)
  addressId?: string;

  @HasOne(() => Address, 'id')
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
