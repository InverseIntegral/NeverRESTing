require('dotenv').config({
    path: 'app/config/.env'
});

const expect = require('chai').expect;
const githubHelper = require('../../app/helpers/githubHelper');

describe('githubHelper', () => {

    describe('#requestToken', () => {

        it('should return an error message when provided an invalid code', (done) => {
            githubHelper.requestToken('123')
                .then(response => {
                    expect(response.status.code).to.be.equal(200);
                    expect(response.entity.error).to.be.equal('bad_verification_code');

                    done();
                }, error => {
                    done(error);
                });


        });
    });

    describe('#extractScopes', () => {

        it('should extract scopes from correct header', () => {
            const headers = {
                'X-Oauth-Scopes': 'First, Second, Third'
            };

            const returnedScopes = githubHelper.extractScopes(headers);

            expect(returnedScopes).to.be.a('array');
            expect(returnedScopes).to.have.length(3);
            expect(returnedScopes).to.contain('First', 'Second', 'Third');
        });

        it('should return null when extracting an incorrect header', () => {
            const returnedScopes = githubHelper.extractScopes({});
            expect(returnedScopes).to.be.null;
        });
    });

    describe('#getPrimaryMail', () => {

        it('should return the correct mail', () => {
           const mails = [
               {
                   "email": "octocat@github.com",
                   "verified": true,
                   "primary": true
               },
               {
                   "email": "support@github.com",
                   "primary": false,
                   "verified": false
               }
           ];

            const primaryMail = githubHelper.getPrimaryMail(mails);
            expect(primaryMail).to.be.equal("octocat@github.com");
        });

        it('should return null when there is no primary mail', () => {
            const primaryMail = githubHelper.getPrimaryMail([]);
            expect(primaryMail).to.be.null;
        });
    });
});

