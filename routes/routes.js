import express from 'express';

const  router = express.Router();

import PopulationController from '../controllers/populationsController';

router.post('/location', PopulationController.createLocation);
router.get('/location', PopulationController.getAllLocations);
router.get('/location/:locationId', PopulationController.getSingleLocation);
router.put('/location/:locationId', PopulationController.updateLocation);
router.delete('/location/:locationId', PopulationController.deleteLocation);

export default router;
