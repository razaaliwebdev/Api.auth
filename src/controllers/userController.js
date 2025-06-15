import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(401).json({
                success: false,
                message: "All the fields are required."
            });
        };

        const userAlreadyExist = await User.findOne({ email });
        if (userAlreadyExist) {
            return res.status(409).json({
                success: false,
                message: "User already exist with this email."
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create(
            {
                name,
                email,
                password: hashedPassword,
                avatar: req.file.path    // Store the image path
            }
        );

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            token, user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error", error
        });
    };
};


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "All the fields are required."
            });
        };

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(409).json({
                success: false,
                message: "Not User Found."
            });
        };

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        };

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        return res.status(200).json({
            success: true,
            message: "User loggedin successfully.",
            token,
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error", error
        });
    };
};


export const profile = async (req, res) => {
    try {

        const user = req.user;

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile fetched successfully",
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        if (users == 0) {
            return res.status(401).json({
                success: false,
                message: "No Users Found."
            });
        };

        return res.status(200).json({
            success: true,
            message: "Fetched all users successfully.",
            users
        });
    } catch (error) {
        return res.statu(500).json({
            success: false,
            message: "Internal server error", error
        });
    };
};