const { translate_error } = require('../../errors/handler');

it('translate_error with no err returns', (done) => {
    translate_error(null, null);
    done();
});