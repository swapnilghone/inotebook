const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URL;

const connectToMongo = () =>{
    mongoose.connect(mongoURI);
} 

mongoose.connection.on('connected', () => console.log('connected'));

module.exports =  connectToMongo;