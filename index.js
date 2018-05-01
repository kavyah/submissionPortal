const express = require('express'); 
const router = express.Router();
const app = express();
const mongoose = require('mongoose'); 
const config = require('./config/database');
const path = require('path'); 
const authentication = require('./routes/authentication')(router);
const submit = require('./routes/submit')(router);
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT||8080;
// Database Connection
mongoose.Promise = global.Promise;
mongoose.connect(config.uri,(err) => {
    if (err) {
        console.log('Could NOT connect to database: ', err);
    } else {
        console.log('Connected to database: ' + config.db);
    }
});

app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public')); // Provide static directory for frontend
app.use('/authentication', authentication);
app.use('/submit', submit);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.listen(port, () => {
    console.log('Listening on port '+port);
});