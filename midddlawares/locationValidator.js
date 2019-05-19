import validator from 'validator';
// export default Validator;

/**
   * @returns {Object} validate Input
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */

  const validateLocationInput = (req, res, next) => {
  const { location } = req.body;

  if (!location) {
    return res.status(400).send({
      message: 'location is required',
    });
  }
  next();
};
export default validateLocationInput;

