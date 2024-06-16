import User from "../models/userModel";

module.exports = {
    // Requires: legalName, username, google_id, as JSON in req.body
    createUser: async (req, res) => {

        try {
            const { legalName, username, google_id } = req.body;

            if (!legalName || !username || !google_id) {
                return res.status(400).json({ message: 'Either forgot legalName, username, or google_id (from google auth!)' });
            }

            const newUserData =
            {
                legalName: legalName,
                username: username,
                _id: google_id, // we use the google id as the _id
            }

            const user = await User.create(newUserData);

            res.status(200).json(user);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // requires: googleId
    doesUserExist: async (req, res) => {
        try {
            const { google_id } = req.params;

            if (!google_id) {
                return res.status(400).json({ message: 'Please provide google_id (from google auth!)' });
            }

            const user = await User.findById(google_id);

            if (!user) {
                res.status(200).json({ doesUserExist: false });
            } else {
                res.status(200).json({ doesUserExist: true });
            }

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    // requires: googleId
    getUser: async (req, res) => {
        try {
            const { google_id } = req.params;

            if (!google_id) {
                return res.status(400).json({ message: 'Please provide google_id (from google auth!)' });
            }

            const user = await User.findById(google_id);

            res.status(200).json(user);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}