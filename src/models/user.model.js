const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	lastName: {
		type: String,
		required: true,
		lowercase: true
	},
	firstName: {
		type: String,
		required: true,
		lowercase: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		minLength: 4,
		unique: true,
	},
	isAdmin: {
		type: Boolean,
		default: false
	},
	address: {
		type: String,
	},
	phone: {
		type: String,
		maxLength: 15,
	},
	orders: [{
		type:Schema.Types.ObjectId, ref:'Order'
	}]
})

module.exports = mongoose.model('User', userSchema);