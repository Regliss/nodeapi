const Category = require('../models/category.model');

exports.create = (req, res) => {
  const category = new Category({
    title: req.body.title,
    products: req.body.products 

  });

  category
    .save()
    .then((data) => {
      res.send({
        data: data,
      });
    })
    .catch((err) => res.send(err));
};

exports.getCategory = (req, res) => {
  Category.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Category with id ${req.params.id} not found`,
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};

exports.getCategoryz = (req, res) => {
  Category.find()
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Category with id ${req.params.id} not found`,
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};