const express = require('express');
const app = express();

const port = 3000;

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

// app.get('/', function (req, res) {
//     res.status(200).json({
//         message: 'it works'
//     });
//   });
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

module.exports = app;