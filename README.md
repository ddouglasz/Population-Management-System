# Population-Management-System
Population Management System (strictly API) is an application that simulates a system that keeps track of basic population details for different locations.


## Features
* User can POST a location with all it's population details
* User can GET all Locations, with the number of males, females, and total population.
* User GET details of one Location
* User UPDATE the details of a given location
* User can DELETE a given location


###Setup

* Clone the repository
* Checkout to the `develop` branch
* Run `npm i` to install all dependencies
* Add a mongodb url to your `.env` file(see .env.exapmle file).
* Run `npm start:dev` to start the app locally
* Go to `localhost:7777` to access end points.
* Run all tests and coverage using `npm run test a`


## API endpoints and functions

Type of request | route(endpoint)       | Description
----------------| ----------| --------------------
POST     |api/v1/signup|Create a new user
POST     |api/v1/signin|signnin a new user
POST     |api/v1/location|Create a new location
GET      |api/v1/location|Get all locations
GET      |api/v1/:locationId|Get single location
PUT      |api/v1/:locationId|Update single location
DELETE   |api/v1/:locationId|Delete single location
