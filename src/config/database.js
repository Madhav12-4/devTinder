const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://Madhav_108:Math%40258@cluster0.x6rxw.mongodb.net/devTinder"
    )
};




module.exports = {
    connectDB,
}

