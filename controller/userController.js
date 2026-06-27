const validator = require('validator');
const AppError = require("../utils/AppError");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");

const register = async (req, res, next) => {
    const {name, email, password, role = ""} = req.body;

    if (!name || !email || !password) {
        return next(new AppError(400, "USER_VALIDATION_ERROR", "Name, Email and Password all field are mandatory."));
    }

    if (!validator.isEmail(email)) {
        return next(new AppError(400, "USER_VALIDATION_ERROR", "Please enter valid email."));
    }

    if (!validator.isStrongPassword(password, {minLength: 10, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})) {
        return next(new AppError(400, "USER_VALIDATION_ERROR", "Please enter valid password. (minimum 10 characters, at least 1 uppercase letter, at least 1 lowercase letter, at least 1 number, and at least 1 special character)"));
    }
    
    const userExists = await userModel.exists({email: email});
    if (userExists) {
        return next(new AppError(409, "USER_ALREADY_EXISTS", "Email already exists."));
    }

    let saltRound = Number (process.env.USER_PASSWORD_SALT_ROUND);
    
    const hashPassword = await bcrypt.hash(password, saltRound);

    const userRole = (role == process.env.ADMIN_ROLE_SECRET) ? 'admin' : 'customer';

    const userData = await userModel.create({
        name,
        email,
        password: hashPassword,
        role: userRole
    })

    res.status(201).json({
        status: true,
        data: {
            name: name,
            email: email,
            role: userRole
        }
    });
}

const login = async (req, res, next) => {
    const {email, password} = req.body;
    
    if (!email || !password) {
        return next(new AppError(400, "USER_VALIDATION_ERROR", "Email and Password all field are mandatory."));
    }

    let userData = await userModel.findOne({email: email});

    if (!userData.email) {
        return next(new AppError(404, "USER_NOT_FOUND", "User not found."));
    }

    let verified = await bcrypt.compare(password, userData.password);

    if (!verified) {
        return next(new AppError(404, "USER_NOT_FOUND", "User not found."));
    }
    
    let authToken = jwt.sign({
        name: userData.name,
        email: userData.email,
        role: userData.role
    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE_IN});

    res.status(200).json({
        status: true,
        data: {
            id: userData.__id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            authToken: authToken
        }
    })
}

module.exports = {register, login};