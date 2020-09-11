// create router
const router = require('express').Router()


// import models
const db = require('../models')

// GET /bounties
router.get('/', (req,res) => {
    // get all the bounties
    db.Bounty.find()
    .then(foundBounties => {
        res.send(foundBounties)
    }).catch(err => {
        console.log(err)
        res.status(503).send({message: 'Database asleep?'})
    })
    //res.send('You\'ve reached the GET /bouties route')
})

// GET /bounties/:id
router.get('/:id', (req,res) => {
    db.Bounty.findById(req.params.id)
    .then(foundBounty => {
        if(foundBounty) {
            res.send(foundBounty)
        } else {
            res.status(404).send({message: 'Not Found'})
        }
    }).catch(err => {
        console.log('Error while deleting a bounty ',err)
        res.status(503).send({message: 'Server Error'})
        
    })
    //res.send('You\'ve reached the GET /bouties/id route')
})

// POST /bounties
router.post('/', (req,res) => {
    // create a bounty
    db.Bounty.create(req.body)
    .then(createdBounty => {
        console.log(createdBounty);
        res.status(201).send(createdBounty)
    }).catch(err => {
        console.log('Error while creating new bounty ',err)
        if(err.name === 'Validation Error') {
            res.status(406).send({message: 'Validation Error'})
        } else {
            res.status(503).send({message: 'Database asleep?'})
        }
    }).catch(err => {
        console.log('Error while finding a bounty ',err)
        res.status(503).send({message: 'Server Unavailable'})
        
    })

    //res.send('You\'ve reached the post /bouties route')
})

// PUT /bounties/:id
router.put('/:id', (req,res) => {
    db.Bounty.findOneAndUpdate({
        _id: req.params.id
    }, 
    req.body,
    {
        new: true
    })
    .then(updatedBounty => {
        res.send(updatedBounty)
    }).catch(err => {
        console.log('Error while updating a bounty ',err)
        
        res.status(503).send({message: 'Server Error'})
        
    })
    //res.send('You\'ve reached the PUT /bouties/id route')
})

// DELETE /bounties
router.delete('/', (req,res) => {
    db.Bounty.deleteMany()
    .then(() => {
        res.status(204).send({message: 'They are all gone!!!'})
    }).catch(err => {
        console.log('Error while deleting a bounty ',err)
        res.status(503).send({message: 'Server Error'})
        
    })
})


// DELETE /bounties/:ID
router.delete('/:id', (req,res) => {
    db.Bounty.findByIdAndDelete(req.params.id)
    .then(()=> {
        res.status(204).send()
    }).catch(err => {
        console.log('Error while deleting a bounty ',err)
        res.status(503).send({message: 'Server Error'})
        
    })
    
    //res.send('You\'ve reached the DELETE /bouties/id route')
})


// export these routes so they can be used in index.js
module.exports = router