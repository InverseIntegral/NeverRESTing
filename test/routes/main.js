const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let expressApp;
let app;

describe('main', () => {

    before(() => {
        process.env.NODE_ENV = 'test';
        expressApp = require('../../app/express/configuration');
        app = require('../../app');
    });

    describe('#checkSession', () => {

        const validateResponse = (done, err, res) => {
            expect(res.redirects).not.to.be.empty;
            expect(res.status).to.be.equal(200);

            done();
        };

        it('should redirect when no session token is set', (done) => {
            chai.request(expressApp)
                .get('/')
                .end((err, res) => validateResponse(done, err, res));

        });

        it('should check session for todo mapping', (done) => {
            chai.request(expressApp)
                .get('/todos')
                .end((err, res) => validateResponse(done, err, res));
        });

        it('should check session for todo mapping', (done) => {
            chai.request(expressApp)
                .get('/todos/1/toggle')
                .end((err, res) => validateResponse(done, err, res));
        });

    });

});