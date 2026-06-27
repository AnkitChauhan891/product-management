const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        const connect = await mongoose.connect(process.env.DB_CONNECTION_STRING);
        console.log("Database Connected: " + connect.connection.name);
    } catch (error) {
        console.log("Database connection faield. Error:" + error);
    }
}

module.exports = connectDB;