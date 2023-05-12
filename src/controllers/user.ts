import { RequestHandler } from "express";

export const getUsers: RequestHandler = (req, res, next) => {
  res.status(200).json({ message: "success", users: [{ name: "User1" }] });
};
