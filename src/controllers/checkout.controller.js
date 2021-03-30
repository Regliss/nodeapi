// clé secrète
const stripe = require('stripe')('sk_test_51IYB3kKHE4A4HHrOUKXd5GZqbWNq1QSmWvqY2al9fB1K2XCKk3vlC7N0e8Ob20IZVLEYrExnMZycwBlTKPuyrnNY001cANctnM')

exports.checkout = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: req.body.amount,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.VUE}/success`,
    cancel_url: `${process.env.VUE}/cancel`,
  });
  console.log(res);

  res.json({ id: session.id });
};
