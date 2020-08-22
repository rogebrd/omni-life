const createHttpError = require('http-errors');

function translate_error(err, res) {
    if (!err) {
        return;
    }

    // convert error to HTTP error
    switch (err.code) {
        case 'SQLITE_ERROR':
            res.statusCode = 500;
            res.statusMessage = err.code;
            break;
        default:
            console.error(err);
            res.statusCode = 500;
            res.statusMessage = `UNCAUGHT ERROR CODE: ${err.code}`;
            break;
    }
    // Send back final error
    res.send(createHttpError(err));
}

module.exports = {
    translate_error: translate_error
};