const { translate_error } = require('../../errors/handler');

it('translate_error can be called', (done) => {
    translate_error(null, null);
    done();
});