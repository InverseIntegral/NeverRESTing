process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('todo', () => {

    describe('#checkSession', () => {

        it('should redirect when no session token is set', (done) => {
            chai.request(app)
                .get('/todos')
                .end((err, res) => validateResponse(done, err, res));

        });

    });

});