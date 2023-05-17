import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  IsUUID,
  CreatedAt,
  UpdatedAt,
  HasOne
} from 'sequelize-typescript';
import { User } from '@models/User';

@Table
export class Address extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @HasOne(() => User)
  user!: User;

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
