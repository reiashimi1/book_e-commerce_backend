import dotenv from 'dotenv';
import dbConn from './db';
import express from 'express';
import { json } from 'body-parser';
import userRouter from './routes/user';
import User from '@models/User';

dotenv.config();
const port = process.env.PORT || 3009;

const app = express();

const sequelize = dbConn.getConnection();
sequelize.sync();

app.use(json());
app.use(userRouter);

app.use('/', async (req, res) => {
  // const { email, password, firstName, lastName } = req.body;
  // const hashedPassword = await bcrypt.hash(password, 8);
  try {
    // const user = new User({ email, password: hashedPassword, firstName, lastName });
    // await user.save();
    res.status(200).send({ message: 'User created successfully' });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
