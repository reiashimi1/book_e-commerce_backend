import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { CustomRequest, JwtPayloadWithUser } from './types';

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const decodedId = jwt.verify(token as string, 'myApplication') as JwtPayloadWithUser;
    const user = await User.findOne({ where: { id: decodedId?.id } });
    if (!user) {
      return res.status(401).send({ error: 'Please authenticate' });
    }
    req.user = user;
    next();
  } catch (e) {
    return res.status(400).send({ error: 'Please authenticate' });
  }
};

export default auth;
