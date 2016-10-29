const expect = require('chai').expect;
const NoContentResponseHandler = require('../../app/handlers/NoContentResponseHandler');

describe('NoContentResponseHandler', () => {

    describe('#constructor', () => {
        it('should construct an object with a symbol attribute', () => {
            const handler = new NoContentResponseHandler();

            expect(handler).to.have.property('responseKey');
            expect(handler.responseKey).to.be.a('symbol');
        });

        it('should construct an object with the response as an attribute', () => {
            const response = {
                'test': 42
            };

            const handler = new NoContentResponseHandler(response);

            expect(handler[handler.responseKey]).to.be.a('object');
            expect(handler[handler.responseKey]).to.be.deep.equal(response);
        });
    });

    describe('#handleSuccess', () => {
        it('should call response object methods', () => {
            const response = {

                status(value) {
                    this.status = value;
                    return this;
                },

                end() {
                    this.end = true;
                }
            };

            const handler = new NoContentResponseHandler(response);

            handler.handleSuccess();
            expect(response.status).to.be.equal(204);
            expect(response.end).to.be.true;
        });
    });

});