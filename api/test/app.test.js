const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Assuming your Express app is in app.js

chai.use(chaiHttp);
const expect = chai.expect;

describe('API Tests', () => {
  it('should return a 200 response for /scrape', (done) => {
    chai.request(app)
      .post('/scrape')
      .send({url: "https://www.google.com"})
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return a JSON response for /scrape', (done) => {
    chai.request(app)
      .post('/scrape')
      .send({url: "https://www.google.com"})
      .end((err, res) => {
        expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
        done();
      });
  });

  // Add more test cases as needed
});
