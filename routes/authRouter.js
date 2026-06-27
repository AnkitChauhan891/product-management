const express = require("express");
const userController = require("../controller/userController");
const authRouter = express.Router();

authRouter.post("/register", userController.register);
authRouter.post("/login", userController.login);


module.exports = authRouter;