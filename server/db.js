const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URL;

const connectToMongo = () =>{
    mongoose.connect(mongoURI).catch(err => console.log(err));
} 

mongoose.connection.on('connected', () => console.log('connected'));

module.exports =  connectToMongo;