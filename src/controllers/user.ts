import { RequestHandler } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import { genSaltSync, hashSync } from 'bcrypt';

export const registerUser: RequestHandler = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const hashedPassword = hashSync(password, 8);
  try {
    const user = new User({ email, password: hashedPassword, firstName, lastName });
    await user.save();
    res.status(200).send({ message: 'User created successfully' });
  } catch (e) {
    res.status(400).send(e);
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = hashSync(password, 8);
  try {
    const user = await User.findOne({ where: { email, password: hashedPassword } });
    let token;
    if (user) {
      token = user.generateAccessToken();
    }
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
};

export const getUsers: RequestHandler = async (req, res) => {
  const users: Array<User> = await User.findAll();
  res.status(200).json({ message: 'success', data: { users } });
};
