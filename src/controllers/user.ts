import * as bcrypt from 'bcrypt';
import { RequestHandler } from 'express';
import User from '../models/User';

export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    await User.create({ email, password, firstName, lastName, role: 'customer' });
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
      user.token = token;
      await user.save();
      return res.status(200).send({ message: 'User logged in successfully', token });
    } else {
      return res.status(400).send({ message: 'Something went wrong' });
    }
  } catch (e) {
    return res.status(500).send();
  }
};

export const loginAdmin: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user?.role !== 'admin') {
      return res.status(403).send({ message: 'Not authorized' });
    }
    if (user && bcrypt.compareSync(password, user?.password)) {
      const token = user.generateAccessToken();
      user.token = token;
      await user.save();
      return res.status(200).send({ message: 'Admin logged in successfully', token });
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
      const { id, email, firstName, lastName, role, creationDate, updatedOn } = user;
      return res
        .status(200)
        .json({
          message: 'Success',
          data: { user: { id, email, firstName, lastName, role, creationDate, updatedOn } }
        });
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
