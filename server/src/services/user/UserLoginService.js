const CreateToken = require("../../utility/CreateToken");
const bcrypt = require('bcrypt');

const UserLoginService = async (Email, password, DataModel) => {
    try {
        // Validate inputs
        if (!Email || !password) {
            return {
                status: "fail",
                message: "Email and password are required"
            };
        }

        // Find user by email
        const user = await DataModel.findOne({ email: Email });

        if (!user) {
            return {
                status: "unauthorized",
                message: "User not found"
            };
        }

        // Compare provided password with stored hash
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return {
                status: "unauthorized",
                message: "Invalid credentials"
            };
        }

        // Generate token
        let token = await CreateToken(user.email);

        // Return user data (excluding sensitive fields)
        const userData = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            mobile: user.mobile,
            photo: user.photo,
            id: user.id
        };

        return {
            status: "success",
            token: token,
            data: userData
        };
    }
    catch (error) {
        console.error("Login Service Error:", error);
        return {
            status: "fail",
            message: "Internal server error",
            error: error.toString()
        };
    }
};

module.exports = UserLoginService;