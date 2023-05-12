import { RequestHandler } from "express";

const auth: RequestHandler = async (req, res, next) => {
  try {
    // middleware
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

//refresh token tabela - id, refreshToken (Random Number), userId, expiresAt (psh 1 dite),
//pastaj krijon access token, dhe ben me jwt id e refresh token
module.exports = auth;
