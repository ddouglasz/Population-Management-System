import validator from 'validator';
// export default Validator;

/**
   * @returns {Object} validate Input
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */

  const validatePopulationInput = (req, res, next) => {
  const { femalePopulation, malePopulation } = req.body;

  if(isNaN(femalePopulation)) {
      return res.status(400).send({
          message: 'female population has to be a number'
      })
  }
  if(isNaN(malePopulation)) {
      return res.status(400).send({
          message: 'male population has to be a number'
      })
  }
  next();
};
export default validatePopulationInput;

