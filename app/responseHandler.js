/**
 * Created by Inverse Integral on 28.05.2016.
 */

let responseKey = Symbol();

class ResponseHandler {

    constructor(response) {
        this[responseKey] = response;
    }

    handleSuccess(result) {
        this[responseKey]
            .status(200)
            .send(result);
    }

    handleFailure(error) {
        this[responseKey]
            .status(500)
            .send(error);
    }

}

module.exports = ResponseHandler;