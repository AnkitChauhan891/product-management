const { Timestamp } = require("bson");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'customer'
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("user", userSchema);