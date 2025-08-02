const mongoose = require('mongoose');

const connectDB = async()=>{
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log('DB connected successfully.')
    })
    .catch((error)=>{
        console.log('error while connecting to DB: ',error);
    })
}

module.exports = connectDB;