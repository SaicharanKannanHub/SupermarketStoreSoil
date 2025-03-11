const db = require("../database");

exports.all = async (req, res) => {
    const products = await db.product.findAll();

    res.json(products);
};

exports.create = async (req, res) => {
    const product = await db.product.create({
        product_name : req.body.product_name,
        price: req.body.price,
        isSpecial: req.body.isSpecial
    });

    res.json(product);
}