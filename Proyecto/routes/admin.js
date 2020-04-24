let express = require('express');
let router = express.Router();

let mongoContext = require('../mongo');
let Movies = mongoContext.Movies;
let Series = mongoContext.Series;
let Admin = mongoContext.Admin;

let contm = 0;
let conts = 0;

router.get('/login', function(req, res, next) {
    res.render('loginadmin', { title: 'StarStreams'});
});

router.post('/login', function(req, res, next) {
    let data = req.body;
  let username = data.username;
  let password = data.password;
  return Admin.findOne({username})
    .then(admin=>{
      console.log(admin);
      if(password === admin.password){
        req.session.name = username;
        req.session.admin = true;
        res.redirect('/admin');
      } else
        res.redirect('/admin/login');
    })
    .catch (next);
});

router.get('/signup', function(req, res, next) {
    res.render('signupadmin', { title: 'StarStreams'});
});

router.post('/signup', function(req, res, next) {
    let data = req.body;
    let username = data.username;
    let password = data.password;

    let item = {
        username,
        password
    };
    let a = new Admin(item);
        return a.save()
        .then (adminCreated=>{
            //res.redirect('admin', {title: 'StarStreams', creation: 'Se guardo con exito la pelicula'});
            req.session.name = username;
            req.session.admin = true;
            console.log(adminCreated);
            res.redirect('/admin');
        })
        .catch(err => {
            next(err);
        });
});

router.get('/', function(req, res, next) {
    if(req.session.admin){   
        contm = 0;
        conts = 0;
        return Movies.find()
        .then(movies=>{
            console.log(movies);
            for(let i = 0; i < movies.length; i++){
                contm++;
            }
            console.log(contm);
            return Series.find().then(series=>{
                for(let i = 0; i < series.length; i++){
                    conts++;
                }
                console.log(conts);
                res.render('admin', { title: 'StarStreams' });
            });
            //res.render('admin', { title: 'StarStreams', pelis: movies });
            //res.status(200).json(flights); //httpStatus.OK
        })
        .catch (next); 
    } else
        res.redirect('/admin/login');
});

router.get('/newmovie', function(req, res, next) {
    if(req.session.admin){
        res.render('newmovie', {title: 'StarStreams'});
    } else
        res.redirect('/admin/login')
});

router.post('/newmovie', function(req,res,next) {
    if(req.session.admin){
        let data = req.body;
        console.log(data);
        contm++;
        let id_num = contm;
        let name = data.name;
        let description = data.desc;
        let category = data.cat;
        let path_dir = data.dir;
        let extension = data.ext;
        let item = {
            id_num,
            name,
            description,
            category,
            path_dir,
            extension
        };
        let m = new Movies(item);
        return m.save()
        .then (movieCreated=>{
            
            console.log(item);
            //res.redirect('admin', {title: 'StarStreams', creation: 'Se guardo con exito la pelicula'});
            res.redirect('/admin');
            console.log('Movie created');
            console.log(movieCreated);
        })
        .catch(err => {
            next(err);
        });
    } else
        res.redirect('/admin/login')
    
});

router.get('/newserie', function(req, res, next) {
    if(req.session.admin){
        res.render('newserie', {title: 'StarStreams'});
    } else
        res.redirect('/admin/login')
});

router.post('/newserie', function(req,res,next) {
    if(req.session.admin){
        let data = req.body;
        console.log(data);
        conts++;
        let id_num = conts;
        let name = data.name;
        let description = data.desc;
        let category = data.cat;
        let path_dir = data.dir;
        let extension = data.ext;
        let season = data.temporada;
        let episode = data.epi;
        let item = {
            id_num,
            name,
            description,
            category,
            path_dir,
            extension,
            season,
            episode
        };
        let s = new Series(item);
        return s.save()
        .then (serieCreated=>{
            
            console.log(item);
            //res.redirect('admin', {title: 'StarStreams', creation: 'Se guardo con exito la pelicula'});
            res.redirect('/admin');
            console.log('Serie created');
            console.log(serieCreated);
        })
        .catch(err => {
            next(err);
        });
    } else
        res.redirect('/admin/login')
    
});

module.exports = router;