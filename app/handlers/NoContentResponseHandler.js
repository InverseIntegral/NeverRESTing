/**
 * Created by Inverse Integral on 18.06.2016.
 */
var DefaultResponseHandler = require('./DefaultResponseHandler');

/**
 * This special response handler sends an empty response and
 * the 204 "No Content" header to the client.
 */
class NoContentResponseHandler extends DefaultResponseHandler {

    constructor(response) {
        super(response);
    }

    /**
     * Returns a no content http code and ends the response.
     */
    handleSuccess() {
        this[this.responseKey]
            .status(204)
            .end();
    }

}

module.exports = NoContentResponseHandler;