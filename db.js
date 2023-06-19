const mongoose = require("mongoose");

async function connectDB() {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(
            `Database connection was successfull: ${conn.connection.host}`
        );
    } catch (ex) {
        console.error(`Error: ${ex.message}`);
        process.exit(1);
    }
}

module.exports = connectDB;
