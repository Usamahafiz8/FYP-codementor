const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('resource', ResourceSchema);
