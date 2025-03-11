module.exports = (express, app) => {
    const controller = require("../controllers/product.controller");
    const router = express.Router();

    //select all review.
    router.get("/",controller.all);

    //Create a new review
    router.post("/", controller.create);
    
    //Add routes to server.
    app.use("/api/products", router);
};