const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');
const bands = new Bands();

io.on('connection', client => {
    console.log(`Cliente conectado: ${ client.client.id }`);


    client.emit( 'active-bands', bands.getBands() );
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
    client.on( 'mensaje', ( payload ) => {
        io.emit('mensaje', { admin: 'Nuevo mensaje', mensaje: payload });
    });
    client.on('vote-band', ( payload ) => {
        bands.voteBand( payload.id );
        io.emit( 'active-bands', bands.getBands() );
    });
    client.on('add-band', async ( payload ) => {
        await bands.addBand( new Band(payload.name) );
        io.emit( 'active-bands', bands.getBands() );
    });
    client.on('delete-band', async ( payload ) => {
        await bands.deleteBand( payload.id );
        io.emit( 'active-bands', bands.getBands() );
    });

});
