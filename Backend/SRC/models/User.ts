const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Define the User interface
interface User extends Document {
    names: string;
    email: string;
    password: string;
    isAdmin: Boolean;
}

// Create a Mongoose schema using the User interface
const userSchema = new Schema({
    names: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true }
});

module.exports = mongoose.model("User", userSchema);