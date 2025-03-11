module.exports = (express, app) => {
    const controller = require("../controllers/profile.controlller");
    const router = express.Router();

    //select profile from email.
    router.get("/select/:id",controller.getProfile);

    //Update profile
    router.put("/update", controller.updateProfile);

    //delete
    router.delete("/delete", controller.deleteProfile);
    
    //Add routes to server.
    app.use("/api/profile", router);
};