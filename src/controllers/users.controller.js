const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

exports.create = (req, res) => {

	let hasedPassword = bcrypt.hashSync(req.body.password, 10);
	const user = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		address: req.body.address,
		phone: req.body.phone,
		isAdmin: req.body.isAdmin,
		email: req.body.email,
		password: hasedPassword,
	});

	user.save()
	.then((data) => {
		let userToken = jwt.sign({
			id:data._id
		}, 'supersecret', { expiresIn: 86400 });

		res.send({
			token: userToken,
			auth: true
		});
	})
	.catch((err) => {
		// console.log(error);
		res.status(500).send({
			error: 500,
			message: err.message || "some error occured"
		})
	})
}

exports.addAdmin = (req, res) => {

	// if (req.params.isAdmin = true) {

		let hasedPassword = bcrypt.hashSync(req.body.password, 10);
		const user = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			address: req.body.address,
			phone: req.body.phone,
			isAdmin: req.body.isAdmin,
			email: req.body.email,
			password: hasedPassword,
		});

		user.save()
		.then((data) => {
			let userToken = jwt.sign({
				id:data._id
			}, 'supersecret', { expiresIn: 86400 });

			res.send({
				token: userToken,
				auth: true
			});
		})
		.catch((err) => {
			// console.log(error);
			res.status(500).send({
				error: 500,
				message: err.message || "some error occured"
			})
		})
	// }
}

exports.findOne = (req, res) => {
	User.findById(req.params.id)
	.then((data) => {
		// if (!data) {
		// 	res.status(404).send({
		// 		message: `User with id ${req.params.id} not found`
		// 	})
		// }
		res.send(data);
	})
	.catch((err) =>	res.send(err));
}

exports.login = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
      .then((data) => {
        
      if (!data) {
        return res.status(404).send({
          auth: false,
          token: null,
          message: `No user find with email ${req.body.email}`,
        });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        data.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          auth: false,
          token: null,
          message: 'password is not valid',
        });
      }

      let userToken = jwt.sign(
        {
          id: data._id,
        },
        'supersecret',
        {expiresIn: 86400}
      );

      res.send({
        auth: true,
        token: userToken,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.getUsers = (req, res) => {
  User.find()
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User with id ${req.params.id} not found`,
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};

exports.update = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.params.id },
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            address: req.body.address,
        }
    )
    .then((data) => {
        res.json({
            message :" utilisateur modifier",
            data: data
        });
    }).catch((err) => {
        console.log(err.message);
    })
};

exports.removeOne = (req, res) => {
	User.findByIdAndRemove(req.params.id)
	.then((data) => {
		// if (!data) {
		// 	res.status(404).send({
		// 		message: `User with id ${req.params.id} not found`
		// 	})
		// }
		res.send(data);
	})
	.catch((err) =>	res.send(err));
}