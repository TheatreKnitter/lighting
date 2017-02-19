exports.DATABASE_URL = process.env.DATABASE_URL ||
                        global.DATABASE_URL || 
                        'mongodb://dbuser:dbpassword@ds143539.mlab.com:43539/olympic-lighting';

exports.PORT = process.env.PORT || 8080;