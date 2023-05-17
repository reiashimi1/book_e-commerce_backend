import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  IsUUID,
  CreatedAt,
  UpdatedAt
} from 'sequelize-typescript';

@Table
export class Book extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  title?: string;

  @Column(DataType.STRING)
  author?: string;

  @Column(DataType.STRING)
  description?: string;

  @Column(DataType.STRING)
  imageUrl?: string;

  @Column(DataType.STRING)
  pdfBase64?: string;

  @Column(DataType.DOUBLE)
  price?: number;

  @CreatedAt
  creationDate?: Date;

  @UpdatedAt
  updatedOn?: Date;
}