let express = require('express');
let router = express.Router();

let mongoContext = require('../mongo');
let Users = mongoContext.Users;

router.get('/', function(req,res,next) {
    if(req.session.name){
        let username = req.session.name;
        return Users.findOne({username})
        .then(user=>{
            res.render('payment',{ title: 'StarStreams', user: user });
        })
        .catch(next);
    }
});

router.post('/:id', function(req,res,next) {
    if(req.session.name){
        let _id = req.params.id;
        return Users.findOne({_id})
        .then(userFound=>{
            userFound.state = 'Pagado';
            return userFound.save();
        })
        .then(u=>{
            res.redirect('/');
        })
        .catch(next);
    }
});

module.exports = router;