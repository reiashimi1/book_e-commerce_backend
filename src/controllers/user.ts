import { RequestHandler } from "express";
import { User } from "../models/User";

export const getUsers: RequestHandler = async (req, res) => {
  const users: Array<User> = await User.findAll();
  res.status(200).json({ message: "success", data: { users } });
};
