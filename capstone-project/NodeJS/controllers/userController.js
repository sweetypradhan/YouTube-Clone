import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = 'my_super_secret_key_12345'; // Use your actual secret key

// Register new user
export const registerUser = async (req, res) => {
    console.log("Signup request body:", req.body); // Log the incoming request body

    const { username, email, password, profilePic } = req.body;

    try {
        // Check if user already exists by email or username
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: "Email is already registered" });
        }
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            return res.status(400).json({ message: "Username is already taken" });
        }

        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password, // Password will be hashed in the middleware
            profilePic,
        });

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });


        // Send response
        res.status(201).json({ token, user: newUser });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(400).json({ message: error.message || "Error in creating user" });
    }
};

// User login
export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "Email not found" });

        // Match password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) return res.status(401).json({ message: "Incorrect password" });

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });


        res.json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
};

// Get all users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
