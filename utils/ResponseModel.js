
class SuccessResponse{
    constructor(data) {
        this.data = data;
        this.errno = 0;
    }
}

class ErrorResponse{
    constructor(error) {
        this.error = error;
        this.errno = -1;
    }
}

module.exports = {
    SuccessResponse,
    ErrorResponse
}