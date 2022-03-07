const jwt= require('jsonwebtoken');

const validateToken = (req, res, next)=> {
    //check for the presence of a token
    
    if(req.headers["x-auth-token"]==null){
         return res.status(401).send();
     }
     //validate token
    jwt.verify(req.headers["x-auth-token"],process.env.SECRET_KEY,(err,payload)=>{
        if(err){
            //respond here with a valid http code and message
            return res.status(401).send();
        }
        else if(!payload){
            //respond here with a valid http code and message
            return res.status(401).send();
        }
        next();
    })
}

module.exports = validateToken;