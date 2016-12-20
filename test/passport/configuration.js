process.env.GITHUB_ID = '123';
const {ensureAuthenticated} = require('../../app/passport/configuration');

describe('Passport Configuration', () => {

    describe('#ensureAuthenticated', () => {
        it('should call next when the request is authenticated', (done) => {
            ensureAuthenticated({
                isAuthenticated: () => true
            }, {
                redirect: (url) => done({'returned': url})
            }, () => done());
        });

        it('should call redirect when the request is unauthenticated', (done) => {
            ensureAuthenticated({
                isAuthenticated: () => false
            }, {
                redirect: () => done()
            }, () => done('error'));
        });
    });

});