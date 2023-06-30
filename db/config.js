const mongoose = require("mongoose")
const connectDB = () => {
    const mongoUrl = process.env.MONGOURL;
    mongoose.connect(mongoUrl).then( () => console.log("connected to database"))
}

module.exports = connectDB;