import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, dateOfBirth, role } = req.body;

        if (!firstName || !lastName || !email || !password || !dateOfBirth || !role) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            dateOfBirth,
            role
        });

        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET,
        );

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                dateOfBirth: newUser.dateOfBirth,
                token,
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Email or Password is Incorrect' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Email or Password is Incorrect' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
        );

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                dateOfBirth: user.dateOfBirth,
                token,
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}