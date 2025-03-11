
const db = require("../database");

exports.getProfile = async (req, res) => {
    const profile = await db.user.findByPk(req.params.id);

    res.json(profile);

};


exports.updateProfile = async (req, res) => {
    
    
        // Find the user by email
        const user = await db.user.findOne(req.query.email);

        // If the user is not found, return a 404 status and null
        if (!req.query.email) {
            return res.status(400).json({ message: 'Email is required' });
          }
        else
            

        // Update user attributes
        user.name = req.body.name;
        user.email = req.body.email;
        user.dob = req.body.dob;

        // Save the updated user to the database
        await user.save();

        // Respond with the updated user profile
        res.json(user);


};

exports.deleteProfile = async (req, res) => {
    
    const user = await db.user.findByPk(req.query.email);

    if(user === null){
        res.json(null)

    }
    else{
        const deletedProfile = await user.destroy();

        res.json(deletedProfile);

    }

};