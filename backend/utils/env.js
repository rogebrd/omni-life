const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    db_file: process.env.DB_FILE
};