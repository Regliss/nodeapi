const Product = require('../models/product.model');

exports.create = (req, res) => {
	const product = new Product({
		price: req.body.price,
		title: req.body.title,
		description: req.body.description,
		image: req.body.image
	});

	product.save()
	.then((data) => {
		res.send({
			product:data,
			created: true
		})
	})
	.catch((err) => {
		console.log(error);
		res.status(500).send({
			error: 500,
			message: err.message || "some error occured"
		})
	})
}


exports.getProduct = (req, res) => {
	Product.findById(req.params.id)
	.then((data) => res.send(data))
	.catch((err) =>	res.send(err));
}

exports.getProducts = (req, res) => {
  Product.find()
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Product with id ${req.params.id} not found`,
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};