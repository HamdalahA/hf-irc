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
    const {userName, email, password } = req.body;
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
        res.status(200).json({ 
          message: "You have successfully registered",
          userDetail 
        });
      });
  }).catch(error => res.status(500).json({ error: error.message }))
},

  signin(req, res) {
    const { identifier } = req.body;
    User
      .findOne({
        where: {
          $or: [
            {
              email: identifier
            },
            {
              userName: identifier
            }
          ]
        },
      })
      .then((userFound) => {
        if (!userFound) {
          return res.status(401).json({
            error: 'Email/Username and password mismatch'
          });
        }
        const { password } = userFound;
        if (!bcrypt.compareSync(req.body.password, password)) {
          return res.status(401).json({
            error: 'Email/Username and password mismatch'
          });
        }
        const token = jwt.sign(
          { id: userFound.id }
          , secret
          , { expiresIn: '48h' }
        );
        return res.status(200)
          .json({
            message: 'You have successfully signed in!',
            token
          });
      }).catch(error => res.status(500).json({
        error: error.message
      }));
    }
}
