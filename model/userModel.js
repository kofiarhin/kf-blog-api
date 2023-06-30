const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, // todo validate email later
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


userSchema.pre("save", async function() {

    if(this.isModified("password")) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
    }
})
module.exports = mongoose.model("User", userSchema)