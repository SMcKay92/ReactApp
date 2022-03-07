var express = require('express');
var router = express.Router();
var User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_KEY;


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

 // Register user
 router.post("/register", function(req, res)
 {
    User.create(
    {
       firstName: req.body.firstName,
       lastName: req.body.lastName,
       email: req.body.email,
       password: bcrypt.hashSync(req.body.password, 10)
    }, 
      function(err, savedUser)
      {
       if(err) return res.status(400).send(err);
 
       jwt.sign(savedUser.toJSON(), jwtKey, function(err, token)
       {
          if(err) return console.log(err.message);
          res.header("Access-Control-Expose-Headers", "x-auth-token");
          res.header("x-auth-token", token);
          return res.status(201).send("good");
       });
    });
 });

  router.post("/login", function(req, res)
  {
    User.findOne({email: req.body.email}, function(err, user)
    {
      if(err) return res.sendStatus(400);
      if(!user) return res.sendStatus(404);

      bcrypt.compare(req.body.password, user.password).then(function(result)
      {
        if(err) return res.sendStatus(500);
        if(!result) return res.sendStatus(401);


        jwt.sign(user.toJSON(), jwtKey, function(err, token)
        {
          if(err) return console.log(err.message);
          res.header("Access-Control-Expose-Headers", "x-auth-Token");
          res.header("x-auth-token", token);
          res.status(200).send("accepted");
        });
      });
    });
  });
















module.exports = router;
