import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';
import mongoose from 'mongoose';

const { expect, assert, should } = chai;

let auth;
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
				  let	locationId1 = res.body.id;
					done();
				});
		});

	});
});
