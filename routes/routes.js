import express from 'express';

//middlewares
import auth from '../midddlawares/auth';
import validatePopulationInput from '../midddlawares/populationsValidation';
import validateLocationInput from '../midddlawares/locationValidator';
import validateUserSignUp from '../midddlawares/signupValidator';
import validateUserSignIn from '../midddlawares/signinValidator';

// controllers
import PopulationController from '../controllers/populationsController';
import UserController from '../controllers/userController'

const  router = express.Router();


//population Routes
router.post('/signup', validateUserSignUp, UserController.signUp);
router.post('/signin', validateUserSignIn, UserController.signIn);
router.post('/location', auth, validatePopulationInput, validateLocationInput, PopulationController.createLocation);
router.get('/location', PopulationController.getAllLocations);
router.get('/location/:locationId', PopulationController.getSingleLocation);
router.put('/location/:locationId', auth, validatePopulationInput, PopulationController.updateLocation);
router.delete('/location/:locationId', auth, PopulationController.deleteLocation);

//catch invalid routes
router.get('/*', (req, res) => res.status(404).send({
    message: 'Not Found!'
  }));

export default router;
