const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title: {
        type: String,
        lowercase: true
    },
    products: [{
        type:Schema.Types.ObjectId, ref:'Product'
    }]
})

module.exports = mongoose.model('Category', categorySchema);