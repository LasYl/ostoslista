const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const item_schema = new Schema({
    text: {
        type: String,
        required: true
    },
    /*quantity: {
        type: Number,
        required: true
    }*/
});
const item_model = new mongoose.model('item', item_schema);

module.exports = item_model;