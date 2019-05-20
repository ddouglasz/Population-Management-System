import chaiHttp from 'chai-http';
import chai from 'chai';
import app from '../app';

const { expect, assert, should } = chai;
const userEmail = `steve${Math.random() * 100}@population.com`;
should();

chai.use(chaiHttp);

describe('TEST for user routes', () => {
  describe('When user sends a POST request to /api/v1/signup', () => {
    it('should return a status 201 and a response message', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send({
          firstName: 'steve',
          lastName: 'dougs',
          email: userEmail,
          password: 'password'
        })
        .end((err, res) => {
          res.should.have.status(201);
          expect(res.body).to.be.a('object');
          assert.equal(
            res.body.message,
            'Registration Successful'
          );
          done();
        });
    });

    it('should return a status 401 for an empty email field', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send({
          firstName: 'steve',
          lastName: 'dougs',
          email: '',
          password: 'password'
        })
        .end((err, res) => {
          res.should.have.status(401);
          expect(res.body).to.be.a('object');
          assert.equal(
            res.body.message,
            'email can not be empty'
          );
          done();
        });
    });

    it('should return a status 401 for an empty firstname field', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send({
          firstName: '',
          lastName: 'dougs',
          email: 'steve@gmail.com',
          password: 'password'
        })
        .end((err, res) => {
          res.should.have.status(401);
          expect(res.body).to.be.a('object');
          assert.equal(
            res.body.message,
            'firstname can not be empty'
          );
          done();
        });
    });

    it('should return a status 401 for an empty lastname field', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send({
          firstName: 'steve',
          lastName: '',
          email: 'steve@gmail.com',
          password: 'password'
        })
        .end((err, res) => {
          res.should.have.status(401);
          expect(res.body).to.be.a('object');
          assert.equal(
            res.body.message,
            'lastname can not be empty'
          );
          done();
        });
    });

    it('should return a status 409 for invalid email format', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send({
          firstName: 'steve',
          lastName: 'dougs',
          email: 'stevecom',
          password: 'password'
        })
        .end((err, res) => {
          res.should.have.status(409);
          expect(res.body).to.be.a('object');
          assert.equal(
            res.body.message,
            'invalid email format'
          );
          done();
        });
    });

    it('should return a status 401 for a password less than 6 characters', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send({
          firstName: 'steve',
          lastName: 'steve',
          email: 'steve@gmail.com',
          password: 'pas'
        })
        .end((err, res) => {
          res.should.have.status(401);
          expect(res.body).to.be.a('object');
          assert.equal(
            res.body.message,
            'Password must be more than 6 character'
          );
          done();
        });
    });
  });

  describe('When user sends a POST request to /api/v1/signin', () => {
    it('should return a status 200 and a response message', (done) => {
      chai.request(app)
        .post('/api/v1/signin')
        .send({
          email: 'steve@dougs.com',
          password: 'password'
        })
        .end((err, res) => {
          res.should.have.status(200);
          expect(res.body).to.be.a('object');
          assert.equal(
            res.body.message,
            'signed in successfully'
          );
          assert.isString(
            res.body.token,
            'jwt should be a string'
          );
          done();
        });
    });
  });

  it('should return a status 401 if email field is empty', (done) => {
    chai.request(app)
      .post('/api/v1/signin')
      .send({
        email: '',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body).to.be.a('object');
        assert.equal(
          res.body.message,
          'email can not be empty'
        );
        done();
      });
  });

  it('should return a status 404 if email is not in database', (done) => {
    chai.request(app)
      .post('/api/v1/signin')
      .send({
        email: 'steve@thomas.com',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body).to.be.a('object');
        assert.equal(
          res.body.message,
          'Invalid credentials'
        );
        done();
      });
  });

  it('should return a status 401 for invalid email', (done) => {
    chai.request(app)
      .post('/api/v1/signin')
      .send({
        email: 'stevejhdjksk',
        password: 'password'
      })
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body).to.be.a('object');
        assert.equal(
          res.body.message,
          'invalid credentials'
        );
        done();
      });
  });
})
