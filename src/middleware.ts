import { RequestHandler } from "express";

const auth: RequestHandler = async (req, res, next) => {
  try {
    // const token = req.header('Authorization').replace('Bearer ', '');
    // const decoded = jwt.verify(token, 'thisissomething');
    // const user = await User.findOne({_id: decoded._id, 'tokens.token': token});
    //
    // if (!user) {
    //   throw new Error();
    // }
    //
    // req.token = token;
    // req.user = user;
    // next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

//refresh token tabela - id, refreshToken (Random Number), userId, expiresAt (psh 1 dite),
//pastaj krijon access token, dhe ben me jwt id e refresh token
module.exports = auth;
