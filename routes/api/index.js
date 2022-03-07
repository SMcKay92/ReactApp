var express = require('express');
var router = express.Router();


var bandsRouter = require('./bands')
router.use('/bands', bandsRouter)


var usersRouter = require('./users');
router.use('/users', usersRouter);


router.get('/', (req, res,) => {
    res.header("X-aCoolHeader", "hello from a this header");
    res.send('welcome');
  });
  

  

module.exports = router;