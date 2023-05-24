import { Sequelize } from 'sequelize-typescript';
import User from './User';
import Order from './Order';
import Book from './Book';
import Address from './Address';

const sequelize = new Sequelize({
  username: 'postgres',
  password: 'postgres',
  database: 'book_database',
  host: 'localhost',
  dialect: 'postgres',
  logging: false
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
