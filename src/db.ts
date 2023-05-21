import { Sequelize } from 'sequelize-typescript';
import User from './models/User';
import Order from './models/Order';
import Book from './models/Book';
import Address from './models/Address';

const sequelize = new Sequelize({
  username: 'postgres',
  password: 'postgres',
  database: 'book_database',
  host: 'localhost',
  dialect: 'postgres'
});

sequelize.addModels([User, Order, Book, Address]);

const dbConn = {
  getConnection: () => {
    try {
      sequelize.authenticate().then(() => console.log('Session established'));
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
    return sequelize;
  }
};

export default dbConn;
