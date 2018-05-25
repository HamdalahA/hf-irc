import jwt from 'jsonwebtoken';
import dotnev from 'dotenv';

dotnev.config();

const key = process.env.SECRET_KEY;

const authenticate = {
  Verify: (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers.token;
    if (!token) {
      return res.status(401).send({
        message: 'You need to be authenticated to access this route!'
      });
    }

    jwt.verify(token, key, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: 'Invalid token, please provied a valid token!'
        });
      }
      req.decoded = decoded;
      next();
    });
  }
};

export default authenticate;
