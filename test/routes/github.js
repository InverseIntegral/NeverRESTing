process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('github', () => {

    it('should return an error code when requesting without parameter', (done) => {
        chai.request(app)
            .get('/github')
            .end((err, res) => {
                expect(res.statusCode).to.be.equal(400);
                done();
            });

    });

});