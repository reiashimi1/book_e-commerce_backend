import dotenv from 'dotenv';
import express from 'express';
import { json } from 'body-parser';
import Routes from './routes';
import dbConn from './models/index';
import cors from 'cors';
import User from './models/User';

dotenv.config();
const port = process.env.PORT || 3009;

const app = express();
app.use(cors());

const sequelize = dbConn.getConnection();
sequelize.sync().then(() => {
  // const admin = User.findOrCreate({
  //   where: {
  //     email: 'admin@admin.com',
  //     password: 'Admin123',
  //     firstName: 'Rei',
  //     lastName: 'Ashimi',
  //     role: 'admin'
  //   }
  // });
});

app.use(json());
app.use(Routes);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
