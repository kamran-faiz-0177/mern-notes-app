const UserModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");

const SignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const checkUser = await UserModel.findOne({ email });
        if (checkUser) {
            return res.status(409).json({
                message: "email already exist go and sign in",
            })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashPassword });
        await newUser.save();

        res.status(201).json({
            message: "signup successfully",
            success: true,
        })

    } catch (error) {
        res.status(500).json({
            message: "internal server error faile to sign up",
            error: error.message,
        })
    }
};

const SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkUser = await UserModel.findOne({ email });
        if (!checkUser) {
            return res.status(404).json({
                message: "email doesn't exist go and signup",
            })
        }
        const checkPassword = await bcrypt.compare(password, checkUser.password);
        if (!checkPassword) {
            return res.status(401).json({
                message: "email or password is wrong",
            })
        }

        res.status(200).json({
            message: "login successfully",
            success: true,
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error failed to signin",
            error: error.message,
        })
    }
};

module.exports = { SignUp, SignIn };