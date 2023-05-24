import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  IsUUID,
  CreatedAt,
  UpdatedAt,
  ForeignKey
} from 'sequelize-typescript';
import User from './User';

@Table
export default class Address extends Model {
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

  @Column(DataType.STRING)
  name?: string;

  @Column(DataType.STRING)
  description?: string;

  @Column(DataType.STRING)
  zipCode?: string;

  @Column(DataType.STRING)
  city?: string;

  @Column(DataType.STRING)
  country?: string;

  @CreatedAt
  creationDate?: Date;

  @UpdatedAt
  updatedOn?: Date;
}
