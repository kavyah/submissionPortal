const crypto = require('crypto').randomBytes(256).toString('hex'); 

module.exports = {
    //uri: 'mongodb://localhost:27017/StudentDetails', // Databse URI and database name
    uri: 'mongodb://kavyah:kavyah@ds263639.mlab.com:63639/studentsubmissions',
    secret: crypto,// Cryto-created secre // Database name
    db: 'studentsubmissions'
}
