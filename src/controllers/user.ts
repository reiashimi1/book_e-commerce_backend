import * as bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import User from '../models/User';

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    await User.create({ email, password, firstName, lastName });
    return res.status(200).send({
      message: 'User created successfully'
    });
  } catch (e) {
    return res.status(500).send(e);
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user && bcrypt.compareSync(password, user?.password)) {
      const token = user.generateAccessToken();
      return res.status(200).send({ message: 'User logged in successfully', token });
    } else {
      return res.status(400).send({ message: 'Something went wrong' });
    }
  } catch (e) {
    return res.status(500).send();
  }
};

export const getCurrentUser: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id } });
    if (user) {
      return res.status(200).json({ message: 'Success', data: { user } });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (e) {
    return res.status(500).send();
  }
};

// export const getUsers: RequestHandler = async (req, res) => {
//   const users: Array<User> = await User.findAll();
//   res.status(200).json({ message: 'success', data: { users } });
// };
