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
import Address from './Address';
import jwt from 'jsonwebtoken';
import Order from './Order';
import * as bcrypt from 'bcrypt';

const saltRounds = Number(process.env.SALT_KEY);

@Table
export default class User extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
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

  @HasMany(() => Address, 'id')
  addresses?: Address[];

  @CreatedAt
  creationDate?: Date;

  @UpdatedAt
  updatedOn?: Date;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(currentUser: User) {
    if (currentUser.changed('password') && !!currentUser.password) {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = bcrypt.hashSync(currentUser.password, salt);
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
    console.log(this.id, 'id');
    const jwtToken = jwt.sign({ id: this.id }, 'myApplication', { expiresIn: '24h' });
    this.token = jwtToken;
    console.log('----------------------------------------------------------------');
    console.log(jwtToken, 'token');
    return jwtToken;
  };
}
