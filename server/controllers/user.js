import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import db from '../models';

const { User } = db;

dotenv.load();
const secret = process.env.SECRETKEY;
const salt = bcrypt.genSaltSync(5);

export default {
  register(req, res) {
    const {userName, email, password } = req.body
    User.findOne({
      where: {
      $or: [
          {
              userName
          },
          {
              email
          }
      ]
      }
  }).then(userFound => {
    if (userFound) {
      return res.status(409).json({
        error: 'User already exists.'
      });
    }

      return User.create({
        userName,
        email,
        password: bcrypt.hashSync(password, salt)
      }).then(user => {
        const userDetail = {
          username: user.userName,
          email: user.email
        };
        res.status.json({ userDetail });
      });
  }).catch(error => res.status(500).json({ error: error.message }))
}
}
