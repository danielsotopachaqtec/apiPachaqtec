const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const port = 3000;

const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')
const userRoutes = require('./api/routes/users')

mongoose.set('useCreateIndex', true);

mongoose.connect(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PW}${process.env.MONGO_ATLAS_URL}`,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log('Database connected sucessfully')

})
.catch(err => {
    console.log('err', err)
})

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use((req,res,next)=> {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', "PUT", "POST", "PATCH", "DELETE", "GET");
        return res.status(200).json({});
    }
    next();
})

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes);
app.use((req,res,next)=> {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
})
app.use((error, req,res, next)=> {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});

module.exports = app;