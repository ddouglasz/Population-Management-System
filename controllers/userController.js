import User from '../models/userModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const saltRounds = 10;
// eslint-disable-next-line require-jsdoc
class UserController {
  /** 
   * @description create user controller.
   * @param {object} req - the sent request.
   * @param {object} res - the expected response.
   * @returns {object} - the return function.
   */
  //create user controller
  // eslint-disable-next-line require-jsdoc
  static signUp(req, res) {
    const { firstName, lastName, email, password } = req.body
    return User.findOne({ email })
      .then((userEmail) => {
        if (userEmail) {
          return res.status(404).json({
            message: "This user already exists"
          })
        }
        let user = new User({
          firstName,
          lastName,
          email,
          hashPassword: bcrypt.hashSync(password, saltRounds)
        });

        return user
          .save()
          .then((newUser) => {
            const accessToken = jwt.sign(
              {
                id: newUser.id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
              },
              process.env.secretKey,
              { expiresIn: '24h' },
            );
            return (res.status(201).send({
              id: newUser.id,
              message: 'Registration Successful',
              token: accessToken,
            }));
          })
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          message: 'server error',
          error: error.message,
        });
      });
  }
  /** 
   * @description create user controller.
   * @param {object} req - the sent request.
   * @param {object} res - the expected response.
   * @returns {object} - the return function.
   */
  //create user controller
  // eslint-disable-next-line require-jsdoc
  static signIn(req, res) {
    const { email, password } = req.body
    return User.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.status(401).json({
            success: false,
            message: 'Invalid credentials',
          })
        }
        let validatePassword = bcrypt.compareSync(password, user.hashPassword);
        if (validatePassword) {
          return res.status(200).json({
            id: user.id,
            message: 'signed in successfully',
            token: jwt.sign(
              {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
              }
              , process.env.secretKey,
              { expiresIn: '24h' }
            ),
            email: user.email,
            id: user.id,
          });
        }
        return res.status(401).json({
          message: 'invalid credentials'
        });
      })
      .catch(error => res.status(500).json(error));
  }
}


export default UserController;