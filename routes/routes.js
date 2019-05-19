import express from 'express';
import validatePopulationInput from '../midddlawares/populationsValidation';
import validateLocationInput from '../midddlawares/locationValidator';

const  router = express.Router();

import PopulationController from '../controllers/populationsController';

router.post('/location', validatePopulationInput, validateLocationInput, PopulationController.createLocation);
router.get('/location', PopulationController.getAllLocations);
router.get('/location/:locationId', PopulationController.getSingleLocation);
router.put('/location/:locationId', validatePopulationInput, PopulationController.updateLocation);
router.delete('/location/:locationId', PopulationController.deleteLocation);

export default router;
