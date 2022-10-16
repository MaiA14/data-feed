const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express()
const http = require('http').createServer(app);

const config = require('./db/config');


// server settings
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: 'http://localhost:3000',
        credentials: true
    };
    app.use(cors(corsOptions));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


app.use(express.static('public'));

const port = config.server.port;
http.listen(port, () => {
    console.info('Server is running on port: ' + port)
});