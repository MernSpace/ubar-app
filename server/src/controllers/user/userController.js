const DataModel = require("../../model/user/userModel");
const OTPSModel = require("../../model/user/otpModel");
const UserCreateService = require("../../services/user/UserCreateService");
const UserLoginService = require("../../services/user/UserLoginService");
const UserUpdateService = require("../../services/user/UserUpdateService");
const UserDetailsService = require("../../services/user/UserDetailsService");
const UserResetPassService = require("../../services/user/UserResetPassService");
const UserVerifyOtpService = require("../../services/user/UserVerifyOtpService");
const UserVerifyEmailService = require("../../services/user/UserVerifyEmailService");
const DetailByIdService = require("../../services/common/DetailsByIDService");
const bcrypt = require('bcrypt');
const e = require("cors");
const CreateToken = require("../../utility/CreateToken");

exports.Registration = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password, role, address, photo } = req.body;

        // 1. Validate input
        if (!firstName || !lastName || !email || !phone || !password || !role || !address) {
            return res.status(400).json({ status: "fail", message: "All fields are required" });
        }

        // 2. Check for existing user
        const existingUser = await DataModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ status: "fail", message: "User with this email already exists" });
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Create user
        const user = await DataModel.create({
            firstName,
            lastName,
            email,
            phone,
            password: hashedPassword,
            role,
            address,
            photo
        });

        // 5. Return success (omit password)
        const { password: _, ...userWithoutPassword } = user.toObject();

        let token = await CreateToken(userWithoutPassword);

        res.status(201).json({
            status: "success",
            message: "User registered successfully",
            user: userWithoutPassword,
            token: token
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
}



exports.login = async (req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Email and password are required"
            });
        }

        let Result = await UserLoginService(email, password, DataModel);
        res.status(200).json(Result);

    } catch (e) {
        console.error(e);
        res.status(500).json({
            status: "error",
            message: "Internal server error"
        });
    }
}

exports.ProfileUpdate = async (req, res) => {
    let Result = await UserUpdateService(req, DataModel)
    res.status(200).json(Result)
}

exports.ProfileDetails = async (req, res) => {
    let Result = await UserDetailsService(req, DataModel)
    res.status(200).json(Result)
}


exports.RecoverVerifyEmail = async (req, res) => {
    let Result = await UserVerifyEmailService(req, DataModel)
    res.status(200).json(Result)
}


exports.RecoverVerifyOTP = async (req, res) => {
    let Result = await UserVerifyOtpService(req, OTPSModel)
    res.status(200).json(Result)
}

exports.RecoverResetPass = async (req, res) => {
    let Result = await UserResetPassService(req, DataModel)
    res.status(200).json(Result)
}

