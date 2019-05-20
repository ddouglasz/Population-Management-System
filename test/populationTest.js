import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect, assert, should } = chai;

let auth;
let locationId;
should();

chai.use(chaiHttp);

const userEmail = `steve${Math.random() * 100}@weconnect.com`;

const locationDetails = {
	location: 'Gwarimpa',
	malePopulation: 10000,
	femalePopulation: 20000,
}

describe('TEST for populations', () => {

	describe('POST population details of a location:When user sends a POST request to /api/v1/location', () => {
		before((done) => {
			chai.request(app)
				.post('/api/v1/signup')
				.type('form')
				.send({
					firstName: 'Daniel12',
					lastName: 'Craig12',
					email: userEmail,
					password: 'password'
				})
				.end((err, res) => {
					auth = res.body.token;
					done();
				});
		});
		it('should return a status 201 and a response message for a new location', (done) => {
			chai.request(app)
				.post('/api/v1/location')
				.set('auth', auth)
				.type('form')
				.send(locationDetails)
				.end((err, res) => {
					res.should.have.status(201);
					expect(res.body).to.be.a('object');
					assert.equal(
						res.body.message,
						'New location registered successfully'
					);
					locationId = res.body.location._id;
					done();
				});
		});
		it('should return a status 400: female population has to be a number', (done) => {
			chai.request(app)
				.post('/api/v1/location')
				.set('auth', auth)
				.type('form')
				.send({
					location: 'Gainsville',
					femalePopulation: '23h',
					malePopulation: 3000,
				})
				.end((err, res) => {
					res.should.have.status(400);
					expect(res.body).to.be.a('object');
					assert.equal(
						res.body.message,
						'female population has to be a number'
					);
					done();
				});
		});

		it('should return a status 400: male population has to be a number', (done) => {
			chai.request(app)
				.post('/api/v1/location')
				.set('auth', auth)
				.type('form')
				.send({
					location: 'Gainsville',
					femalePopulation: 200000,
					malePopulation: 'NotaNumber',
				})
				.end((err, res) => {
					res.should.have.status(400);
					expect(res.body).to.be.a('object');
					assert.equal(
						res.body.message,
						'male population has to be a number'
					);
					done();
				});
		});

		it('should return a status 401 for an empty location field', (done) => {
			chai.request(app)
				.post('/api/v1/location')
				.set('auth', auth)
				.type('form')
				.send({
					location: '',
					femalePopulation: 200000,
					malePopulation: 12000,
				})
				.end((err, res) => {
					res.should.have.status(401);
					expect(res.body).to.be.a('object');
					assert.equal(
						res.body.message,
						'location can not be empty'
					);
					done();
				});
		});

		describe('requests for locations', () => {
			it('should return 200 status code and all locations', (done) => {
				chai.request(app)
					.get('/api/v1/location')
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.location.should.be.a('array');
						assert.isString(
							res.body.message,
							'all locations'
						);
						done();
					});
			});

			it('should return 404 status code to retrieve a single location with the right locationId params', (done) => {
				chai.request(app)
					.get(`/api/v1/location/${locationId}`)
					.end((err, res) => {
						res.should.have.status(200);
						res.body.should.be.a('object');
						res.body.location.should.be.a('object');
						done();
					});
			});
			it('should return 404 status code and  an error message for a location that is not in the database', (done) => {
				chai.request(app)
					.get('/api/v1/location/404')
					.end((err, res) => {
						res.should.have.status(404);
						res.body.should.be.a('object');
						assert.equal(
							res.body.message,
							'This location does not exist'
						);
						done();
					});
			});

			it('should update the details of a location', (done) => {
				chai.request(app)
					.put(`/api/v1/location/${locationId}`)
					.set('auth', auth)
					.type('form')
					.send({
						location: 'Gainsville',
						femalePopulation: 30009,
						malePopulation: 3000,
					})
					.end((err, res) => {
						res.should.have.status(200);
						expect(res.body).to.be.a('object');
						assert.equal(
							res.body.message,
							'Location details updated successfully'
						);
						done();
					});
			});
			it('should not permit delete for unauthorized that did not login user to delete a location', (done) => {
				chai.request(app)
					.delete(`/api/v1/location/${locationId}`)
					.end((err, res) => {
						res.should.have.status(401);
						res.body.should.be.a('object');
						assert.equal(
							res.body.message,
							'You are not authorized to perform this change! kindly login'
						);
						done();
					});
			});
		});
	});
});
