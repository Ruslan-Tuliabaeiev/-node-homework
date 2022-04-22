const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;


const db = mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}) ;

mongoose.connection.on('connected', () => { 
    console.log('Mongoose is connected');

})
mongoose.connection.on('error', (err) => { 
    console.log( err);
})
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected');
 })   
process.on('SIGINT', () => { 
    mongoose.connection.close(() => { 
        console.log('Mongoose is disconnected through app termination');
        process.exit(1);
    })
}) 

module.exports = db;
