const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
	total: Number,
	user: { 
		type: Schema.Types.ObjectId, ref: 'User'
	},
	products: [{ 
		type: Schema.Types.ObjectId, ref: 'Product'
	}],
	status: {
		type: String,
		default: "En Cours"
	},
})


module.exports = mongoose.model('Order', orderSchema);