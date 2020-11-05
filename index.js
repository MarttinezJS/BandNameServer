const express = require('express');
const app = express();
const path = require('path');
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

    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`);
});