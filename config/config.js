require('dotenv').config(); //instatiate environment variables
let CONFIG = {}; //Make this global to use all over the application
CONFIG.app = process.env.APP || 'dev';
CONFIG.port = process.env.PORT || '5000';
CONFIG.db_dialect = process.env.DB_DIALECT || 'mysql';
CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '3306';
CONFIG.db_name = process.env.DB_NAME || 'education';
CONFIG.db_user = process.env.DB_USER || 'root';
CONFIG.db_password = process.env.DB_PASSWORD || 'a5f7c674';
//CONFIG.debug= ['ComQueryPacket', 'RowDataPacket'];
CONFIG.jwt_secret = 'asldjfpqwthaskld';
CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || 'test__jwt';
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || '10000';
CONFIG.secret = 'nothingSecrett';
CONFIG.SSR_URL = 'https://revoedubook.com';
CONFIG.SSR_URL2 = 'https://www.revoedubook.com';
module.exports = CONFIG;
