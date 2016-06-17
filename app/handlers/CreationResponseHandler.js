var DefaultResponseHandler = require('./DefaultResponseHandler');

class CreationResponseHandler extends DefaultResponseHandler {

    constructor(response) {
        super(response);
    }

    /**
     * Returns a success http code and sends the json
     * object to the client.
     * @param result    The resulting object.
     */
    handleSuccess(result) {
        this[this.responseKey]
            .status(201)
            .send();
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

module.exports = CreationResponseHandler;