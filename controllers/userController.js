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
            .catch((error) => {
                res.status(500).json({
                    success: false,
                    message: 'server error',
                    error: error.message,
                });
            });
    }
}

export default UserController;