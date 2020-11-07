const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const server = require('http').createServer(app);

module.exports.io = require('socket.io')(server);

require('dotenv').config();
require('./sockets/socket');



const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );

server.listen( process.env.PORT, ( err ) => {

    if ( err ) {
        throw new Error(err);
    }

    console.log(`Servidor escuchando en el puerto ${ process.env.PORT }...`);
});
mongoose.connect( 'mongodb://localhost:27017/Bands', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, ( err ) => {
    if ( err ) throw err;
    console.log('Base de datos conectada...')
});
