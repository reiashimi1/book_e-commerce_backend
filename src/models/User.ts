import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  IsUUID,
  CreatedAt,
  UpdatedAt,
  Unique,
  Length,
  BeforeCreate,
  BeforeUpdate,
  BeforeDestroy,
  HasMany
} from 'sequelize-typescript';
import bcrypt from 'bcrypt';
import Address from './Address';
import jwt from 'jsonwebtoken';
import Order from './Order';

@Table
export default class User extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column(DataType.UUID)
  id!: string;

  @Unique
  @Column(DataType.STRING)
  email!: string;

  @Length({ msg: 'Must be at least 8 characters', min: 8 })
  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.STRING)
  firstName!: string;

  @Column(DataType.STRING)
  lastName!: string;

  @Column(DataType.STRING)
  token?: string;

  @HasMany(() => Order, 'id')
  orders?: Order[];

  @CreatedAt
  creationDate?: Date;

  @UpdatedAt
  updatedOn?: Date;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(currentUser: User) {
    if (currentUser.changed('password') && !!currentUser.password) {
      const hashedPassword = bcrypt.hashSync(currentUser.password, 8);
      currentUser.password = hashedPassword;
    }
  }

  @BeforeDestroy
  static async destroyUserData(currentUser: User) {
    // Destroy addresses
    const userAddresses = await Address.findAll({ where: { userId: currentUser.id } });
    userAddresses.forEach((address) => address.destroy());
  }

  generateAccessToken = (): string => {
    const token = jwt.sign({ userId: this.id }, 'myApplication', { expiresIn: '24h' });
    return token;
  };
}
