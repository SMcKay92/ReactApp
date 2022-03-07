var express = require('express');
var router = express.Router();
var Band = require('../../models/band');
// const validateToken = require("../../middleware/validateToken")


router.get('/', (req, res) => {
    
    Band.find((err, data) => {

        if(err) return res.status(400).send('Error')

        res.send(data)
    })

  });
  
  router.get('/:id', (req, res) => {
    
    Band.findById(req.params.id, (err, band) => {
        if(err) return res.status(400).send(`Error: ${err.message}`);

        if(!band) return res.status(404).send();

        res.send(band);
    })
  });
  
  router.post('/', (req, res) => {
   
    Band.create(req.body, (err, savedBand) => {
        if(err){
            return res.status(400).send(err);
        }
        res.status(201).send(savedBand);
    })
  });


  router.put('/:id', (req, res) => {

    Band.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, updatedBand) => {
        if(err) return res.status(400).send();
        
        if(!updatedBand) return res.status(404).send();

        res.status(202).send(updatedBand);
    })

  });


  router.delete('/:id', (req, res) => {
    Band.findByIdAndDelete(req.params.id, (err, deletedBand) => {
        if(err) return res.sendStatus(400);

        if(!deletedBand) return res.sendStatus(404);

        res.sendStatus(204);
    })

  });




module.exports = router;