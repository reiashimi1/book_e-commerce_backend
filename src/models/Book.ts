import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  IsUUID,
  CreatedAt,
  UpdatedAt,
  HasMany
} from 'sequelize-typescript';
import Order from './Order';

@Table
export default class Book extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  id!: string;

  @Column(DataType.STRING)
  title?: string;

  @Column(DataType.STRING)
  author?: string;

  @Column(DataType.TEXT)
  description?: string;

  @Column(DataType.TEXT)
  imageUrl?: string;

  @Column(DataType.STRING)
  rating?: string;

  @Column(DataType.TEXT)
  pdfBase64?: string;

  @Column(DataType.DOUBLE)
  price!: number;

  @HasMany(() => Order, 'bookId')
  orders?: Order[];

  @CreatedAt
  creationDate?: Date;

  @UpdatedAt
  updatedOn?: Date;
}
