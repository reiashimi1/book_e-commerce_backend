import dotenv from 'dotenv';
import express from 'express';
import { json } from 'body-parser';
import Routes from './routes';
import dbConn from './models/index';

dotenv.config();
const port = process.env.PORT || 3009;

const app = express();

const sequelize = dbConn.getConnection();
sequelize.sync();

app.use(json());
app.use(Routes);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
