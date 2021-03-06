import isEmail from 'validator/lib/isEmail';

/**
 * @returns {Object} validate Input
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const validateUserSignUp = (req, res, next) => {
  if (req.body.email.trim().length === 0) {
    return res.status(401).send({
      message: 'email can not be empty',
    });
  }
  if (req.body.firstName.trim().length === 0) {
    return res.status(401).send({
      message: 'firstname can not be empty',
    });
  }
  if (req.body.lastName.trim().length === 0) {
    return res.status(401).send({
      message: 'lastname can not be empty',
    });
  }
  if (!req.body.email.trim()) {
    return res.status(401).json({
      message: 'Email is required',
    });
  }
  if (!req.body.password.trim()) {
    return res.status(401).json({
      message: 'Password is required',
    });
  }
  if (req.body.password.length < 6) {
    return res.status(401).json({
      message: 'Password must be more than 6 character',
    });
  }
  if (!req.body.firstName.trim()) {
    return res.status(401).json({
      message: 'firstName is required',
    });
  }
  if (!req.body.lastName.trim()) {
    return res.status(401).json({
      message: 'lastName is required',
    });
  }
  if (!isEmail(req.body.email.trim())) {
    return res.status(409).json({
      message: 'invalid email format',
    });
  }
  return next();
};

export default validateUserSignUp;
