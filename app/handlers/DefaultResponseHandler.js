/**
 * Created by Inverse Integral on 28.05.2016.
 */

/**
 * This class handles responses by using the
 * express js response object.
 * This default implementation can be overridden.
 */
class DefaultResponseHandler {

    constructor(response) {
        this.responseKey = Symbol();
        this[this.responseKey] = response;
    }

    /**
     * Returns a success http code and sends the json
     * object to the client.
     * @param result    The resulting object.
     */
    handleSuccess(result) {
        this[this.responseKey]
            .status(200)
            .send(result);
    }

    /**
     * Returns a server error http code and send
     * the json representation of the error.
     * @param error     The sever error object.
     */
    handleFailure(error) {
        this[this.responseKey]
            .status(500)
            .send(error);
    }

}

module.exports = DefaultResponseHandler;