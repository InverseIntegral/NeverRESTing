process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('main', () => {

    describe('#checkSession', () => {

        it('should redirect when no session token is set', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    expect(res.redirects).not.to.be.empty;
                    expect(res.status).to.be.equal(200);
                    done();
                });

        });

    });

});