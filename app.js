import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser'
import route from './routes/routes'
import dotenv from 'dotenv';

dotenv.config();

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

// Set up mongoose connection
import mongoose from 'mongoose';
let dev_db_url = process.env.MONGODB_URL;

let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true })
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connection.once('open', () => {
  console.log('we are connected to mongoose')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1', route);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('/', (req, res) => res.status(200).send({
  message: 'Server up and running',
}));

module.exports = app;
