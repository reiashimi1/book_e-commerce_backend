import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { CustomRequest, JwtPayloadWithUser } from './interfaces';

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const decodedId = jwt.verify(token as string, 'myApplication') as JwtPayloadWithUser;
    const user = await User.findOne({ where: { id: decodedId?.id } });
    if (!user) {
      return res.status(401).send({ error: 'Please authenticate' });
    }
    if (user?.role !== 'admin') {
      return res.status(403).send({ error: 'Not authorized' });
    }
    req.user = user;
    next();
  } catch (e) {
    return res.status(500).send({ error: 'Please authenticate' });
  }
};

export default auth;
