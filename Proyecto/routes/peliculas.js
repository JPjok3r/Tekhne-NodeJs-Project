let express = require('express');
let router = express.Router();

let mongoContext = require('../mongo');
let Movies = mongoContext.Movies;
let Users = mongoContext.Users;

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.name){
    return Movies.find()
      .then(movies=>{
        res.render('peliculas', { title: 'StarStreams', pelis: movies });
      })
      .catch (next);
  }else
    res.redirect('/users/login');
});

router.get('/:id', function(req, res, next) {
  if(req.session.name){
    let _id = req.params.id;
    let username = req.session.name;
    return Users.findOne({username})
      .then(users=>{
        if(users.state === 'Pagado'){
          return Movies.findOne({_id})
            .then(movies=>{
              console.log(movies);
              res.render('player', { title: 'StarStreams', file: movies });
            })
            .catch (next);
        } else
          res.redirect('/payment');
      })
      .catch (next);
    
  }else
    res.redirect('/users/login');
  
  
});

module.exports = router;