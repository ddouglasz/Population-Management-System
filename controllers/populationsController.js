import Population from '../models/populationModel';

// eslint-disable-next-line require-jsdoc
class populationController {
  /** 
   * @description create location controller.
   * @param {object} req - the sent request.
   * @param {object} res - the expected response.
   * @returns {object} - the return function.
   */
  //create location controller
  // eslint-disable-next-line require-jsdoc
  static createLocation(req, res) {
    const { location, femalePopulation, malePopulation, subLocations } = req.body

    let population = new Population({
      location,
      femalePopulation,
      malePopulation,
      totalPopulation: (Number(femalePopulation) + Number(malePopulation)),
      subLocations,
      userId: req.decoded.id,
    });

    return population
      .save()
      .then((newPopulation) => {
        return res.status(200).json({
          success: true,
          message: 'New census created successfully',
          Cencus: newPopulation
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: 'server error',
          error: error.message,
        });
      });
  }

  /** 
  * @description get all locations controller.
  * @param {object} req - the sent request.
  * @param {object} res - the expected response.
  * @returns {object} - the return function.
  */
  //get all contacts controller
  // eslint-disable-next-line require-jsdoc
  static getAllLocations(req, res) {
    Population.find()
      .select('_id location femalePopulation malePopulation totalPopulation subLocation')
      .then((allLocations) => {
        return res.status(200).json({
          success: true,
          message: 'all locations',
          Census: allLocations
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: 'Server error, please try again',
          error: error.message,
        });
      })
  }

  /** 
  * @description test controller.
  * @param {object} req - the sent request.
  * @param {object} res - the expected response.
  * @returns {object} - the return function.
  */
  //get single population controller
  // eslint-disable-next-line require-jsdoc
  static getSingleLocation(req, res) {
    const { locationId } = req.params;

    Population.findById(locationId)
      .then((locationtDetail) => {
        if (locationtDetail) {
          return res.status(200).json({
            success: true,
            Location: locationtDetail
          });
        }
        return res.status(404).json({
          message: 'This location does not exist'
        })
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: 'This location does not exist',
          error: error.message,
        });
      })
  }

  /** 
   * @description test controller.
   * @param {object} req - the sent request.
   * @param {object} res - the expected response.
   * @returns {object} - the return function.
   */
  //update controller
  // eslint-disable-next-line require-jsdoc
  static updateLocation(req, res) {
    const { locationId } = req.params;
    const { malePopulation, femalePopulation, location } = req.body;
    const updateObject = { malePopulation, femalePopulation, location, totalPopulation: Number(malePopulation) + Number(femalePopulation) };
    Population.findById({ _id: locationId })
      .exec()
      .then((locationContent) => {
        if (req.decoded.id !== locationContent.userId) {
          return res.status(401).json({
            message: "You are not authorized to update this location"
          })
        }
        Population.update({ $set: updateObject })
        res.status(200).json({
          success: true,
          message: 'Location details updated successfully',
          updatedocation: updateObject,
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: 'Server error, please try again',
          error: error.message,
        });
      })
  }

  /** 
   * @description test controller.
   * @param {object} req - the sent request.
   * @param {object} res - the expected response.
   * @returns {object} - the return function.
   */
  //delete location controller 
  // eslint-disable-next-line require-jsdoc
  static deleteLocation(req, res) {
    const { locationId } = req.params;
    Population.findById({ _id: locationId })
      .exec()
      .then((locationContent) => {
        if (req.decoded.id !== locationContent.userId) {
          return res.status(401).json({
            message: 'You are not authorised to delete this location',
          });
        }
        population.remove()
        res.status(200).json({
          success: true,
          message: 'Location deleted successfully',
        });
      })
      .catch((error) => {
        res.status(500).json({
          success: false,
          message: 'This Location does not exist',
          error: error.message,
        });
      })
  }
}

export default populationController;