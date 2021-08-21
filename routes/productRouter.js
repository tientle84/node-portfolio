const express = require('express');
const productRouter = express.Router();

productRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req, res) => {
    res.end('Will send all the products to you');
})
.post((req, res) => {
    res.end(`Will add the product: ${req.body.name} with description: ${req.body.description}`);
})
.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /products');
})
.delete((req, res) => {
    res.end('Deleting all products');
});

module.exports = productRouter;