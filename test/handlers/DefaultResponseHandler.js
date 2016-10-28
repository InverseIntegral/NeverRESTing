const expect = require('chai').expect;

const DefaultResponseHandler = require('../../app/handlers/DefaultResponseHandler');

describe('DefaultResponseHandler', function() {

    describe('#constructor', function() {
        it('should construct an object with a symbol attribute', function() {
            const handler = new DefaultResponseHandler();

            expect(handler).to.have.property('responseKey');
            expect(handler.responseKey).to.be.a('symbol');
        });

        it('should construct an object with the response as an attribute', function() {
            const response = {
                'test': 42
            };

            const handler = new DefaultResponseHandler(response);

            expect(handler[handler.responseKey]).to.be.a('object');
            expect(handler[handler.responseKey]).to.be.deep.equal(response);
        });
    });

    describe('#handleSuccess', function() {
        it('should call response object methods', function() {
            const response = {

                status(value) {
                    this.status = value;
                    return this;
                },

                send(result) {
                    this.result = result;
                }
            };

            const handler = new DefaultResponseHandler(response);
            const result = 'Resultat';

            handler.handleSuccess(result);
            expect(response.status).to.be.equal(200);
            expect(response.result).to.be.equal(result);
        });
    });

});