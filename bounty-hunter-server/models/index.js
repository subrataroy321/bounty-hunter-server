require('dotenv').config();
MONGO_URI = process.env.MONGO_URI

// set up mongoose connection
const mongoose = require('mongoose')

// mongo connection string
// will create a mongodb database if it doesn't exists
mongoose.connect( MONGO_URI || 'mongodb://localhost/bountyhunters', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
})

// shortcut to our mongoose.connection
const db = mongoose.connection

// set up an event listener to fire once the connection 'opens' to console.log what host and port it is running on
db.once('open', () => {
    console.log(`Connected to mongoDB at ${db.host}: ${db.port}`)
})

// set up an event listener to fire on database error and console.log the error object
db.on('error', (err)=> {
    console.log(`Database error: \n ${err}`)
})

// Export all things
module.exports.Bounty = require('./bounty')