var express = require('express');
var router = express.Router();
let mongoContext = require('../mongo');
let Movies = mongoContext.Movies;
let Series = mongoContext.Series;
/* GET home page. */
router.get('/', function(req, res, next) {
  let session = req.session;
  console.log(session);
  if(req.session.name){
    return Movies.find()
      .then(movies=>{
        return Series.find()
          .then(series=>{
            
            res.render('index', { title: 'StarStreams', pelis: movies, serie: series });
            //res.status(200).json(flights); //httpStatus.OK
          })
          .catch (next);
    })
    .catch (next);
  } else{
    res.redirect('/users/login');
  }
  
});

module.exports = router;
