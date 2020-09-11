const express = require('express')
const methodOverride = require('method-override')
const cors = require('cors')

const app = express()
app.use(methodOverride('_method'))

// <<<<<<<< FORM DATA MIDDLEWARE >>>>>>>>>>
// ALLOWS FORM DATA TO BE PROCESSED INTO REQ.BODY
app.use(express.urlencoded({extended: false}))
// tells express to recognise req.body as json object
app.use(express.json())
app.use(cors())


// include the bounties controller
app.use('/bounties', require('./controllers/bounties'))

app.get('/', (req, res) => {
    res.send('You are at home page of Bounty Hunter Server')
})

app.listen(9000, () => {
    console.log('listen to port 9000')
})