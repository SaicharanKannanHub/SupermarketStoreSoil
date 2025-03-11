const db = require("../database");

exports.all = async (req, res) => {
    const reviews = await db.review.findAll();

    res.json(reviews);
};

exports.create = async (req, res) => {
    const review = await db.review.create({
        text: req.body.text,
        rating: req.body.rating,
        product_id : req.body.product_id,
        email : req.body.email
    });

    res.json(review);
}