const { Schema } = require('mongoose');
const { connection } = require('../db');

const storeSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    cnpj: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, );

export default connection.model('Store', storeSchema);