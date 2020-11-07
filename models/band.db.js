const { Schema, model, Document} = require('mongoose');

const bandSchema = new Schema({
    id: String,
    name: {
        type: String,
        required: [true, 'El nombre es requerido.']
    },
    votes: Number
});

bandSchema.method('votar', function() {
    this.votes++;
});

module.exports.BandDB = model('BandDB', bandSchema);
