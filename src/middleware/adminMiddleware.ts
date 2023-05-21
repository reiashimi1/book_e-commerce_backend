import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AdminUser } from '@models/AdminUser';

interface CustomRequest extends Request {
  token?: string;
  user?: AdminUser;
}

const auth = async (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const decodedId = jwt.verify(token as string, 'myApplication');
    const user = await AdminUser.findOne({ where: { id: decodedId } });
    if (!user) {
      throw new Error('User could not be found');
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

export default auth;
