import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import User from '../models/User';

export interface CustomRequest extends Request {
  token?: string;
  user?: User;
}

export interface JwtPayloadWithUser extends JwtPayload {
  id: string;
}
