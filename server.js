const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/productRouter")
const connectDB = require("./config/dbConnection");

const app = express();

const port = process.env.PORT || 3030;

connectDB();

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server Listing on port ${port}`);
});