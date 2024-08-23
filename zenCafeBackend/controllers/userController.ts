import { Interface } from "readline";
import User from "../models/userModel";
var jwt = require('jsonwebtoken');

require('dotenv').config();

const jwtKey = process.env.JWT_KEY;

function authenticateToken(req, res): any | undefined {

    const { authorization } = req.headers

    var encodedToken;

    if (authorization) {
        encodedToken = authorization.split(" ")[1];
    } else {
        res.status(400).json({ message: "No token provided" })
        return;
    }

    try {
        const decodedToken = jwt.verify(encodedToken, jwtKey);

        const { exp } = decodedToken; // expiration date of token

        if (Date.now() > exp) {
            res.status(400).json({
                message: "Token expired, please login again.",
                expired: true
            })
            return;
        }

        return decodedToken;
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(400).json({ message: "Unauthorized access" })
        return;
    }
}

type User = {
    legalName: string;
    username: string;
    _id: string;
}

function generateJWTToken(user: User): string {

    if (!jwtKey) {
        throw new Error('Missing JWT secret key');
    }


    const token = jwt.sign(
        {
            user,
            iat: Date.now(), // Issue at time
            exp: Date.now() + 43200000, // Expiration in 12 hours
        },
        jwtKey
    );

    return token;
}

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

            const token = generateJWTToken(newUserData);

            const userAndToken = {
                user: user,
                token: token,
            }

            res.status(200).json(userAndToken);

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
            const token = generateJWTToken(user);

            const userAndToken = {
                user: user,
                token: token,
            }

            res.status(200).json(userAndToken);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    isTokenValid: async (req, res) => {
        try {

            if (!authenticateToken(req, res)) {
                return;
            }

            res.status(200).json({message: "token is still valid"});

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}