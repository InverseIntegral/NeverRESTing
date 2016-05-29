/**
 * Created by Inverse Integral on 28.05.2016.
 */

// Key for the response property.
let responseKey = Symbol();

/**
 * This class handles responses by using the
 * express js response object.
 */
class ResponseHandler {

    constructor(response) {
        this[responseKey] = response;
    }

    /**
     * Returns a success http code and sends the json
     * object to the client.
     * @param result    The resulting object.
     */
    handleSuccess(result) {
        this[responseKey]
            .status(200)
            .send(result);
    }

    /**
     * Returns a server error http code and send
     * the json representation of the error.
     * @param error     The sever error object.
     */
    handleFailure(error) {
        this[responseKey]
            .status(500)
            .send(error);
    }

}

module.exports = ResponseHandler;