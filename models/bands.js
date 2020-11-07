const Band = require("./band");
const { BandDB } = require('./band.db');


class Bands {

    constructor(){
        this.bands = [];
        this.cargarBands();
    }

    async addBand( band = new Band( )){
        await BandDB.create( band ).then( bandDbResponse => {
            this.bands.push( bandDbResponse );
        }).catch(console.log);
    }

    getBands() {
        return this.bands;
    }

    async cargarBands() {
        this.bands = await BandDB.find();
    }

    async deleteBand( id = '' ) {

        await BandDB.findOneAndRemove({ id })
        await this.cargarBands();
    }

    voteBand( id = '' ) {
        this.bands = this.bands.map( band => {
            if ( band.id === id ) {
                band.votes++;
                BandDB.findOneAndUpdate({ id }, band).catch(console.error);
                return band;
            } else {
                return band;
            }
        });
    }
}

module.exports = Bands;