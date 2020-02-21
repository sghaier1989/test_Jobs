const express = require('express');
const app = express();
const bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');



//*  Test user ***/
const adminuser = {id:1, email:'admin@user.com', nickname:'Abdel-admin', password:'azerty', role:'admin'}
const simpleuser = {id:1, email:'user@user.com', nickname:'Abdel-user', password:'azerty', role:'user'}
const secret = 'qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq';

var users = [adminuser, simpleuser];

let data = require('./jobs');

let initialJobs = data.jobs;
let addedJobs = [];

const getAllJobs = () =>{
  return [...initialJobs ,...addedJobs];
}


const port = 4201;
const api =  express.Router();
const auth =  express.Router();

app.use(bodyParser.json());

//pour acces de n import quel endroit .
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});


api.get('/jobs', (req, res) => {
    //res.json({ sucess:true, message:'Hello word !'});
    console.log('read from back ok');
    res.json(data.jobs);
});

const checkUserToken = (req,res,next) =>{
  if(!req.header('authorization'))
  {
      return res.status(401).json({ success: false, message: 'header autorization manquante'});
  }
  const  val = res.header('authorization').split();
  let token = val[1];
  const decodedToken = jwt.verify(token, secret);
  console.log('decodedToken = '+ decodedToken);
  next();

};

api.post('/jobs', checkUserToken, (req, res) => {
    const job = req.body;
    console.log("POST job = " +job);
    addedJobs = [job, ...addedJobs];
    res.json(job);
});

api.get('/search/:term/:place?', (req, res) => {
    const term = req.params.term.toLowerCase().trim();
    let place = req.params.place;
    let jobs = getAllJobs().filter(j => (j.description.toLowerCase().includes(term) || j.title.toLowerCase().includes(term)));
    if(place) {
        console.log('place ', place);
        place = place.toLowerCase().trim();
        jobs = jobs.filter(j => (j.city.toLowerCase().includes(place)));
    }
    // console.log(jobs);
    res.json({ success: true, jobs: jobs});
});

api.get('/jobs/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const job = getAllJobs().filter(j => j.id === id);
    if(job.length === 1) {
        res.json({ success: true, job: job[0]});
    } else {
        res.json({ success: false, message: `pas de job ayant pour id ${id}`});
    }
});



auth.post('/login', (req, res) => {

  if (req.body){
  const email = req.body.email.toLowerCase().trim();
  const pwd = req.body.password.toLowerCase().trim();
  const isLargeNumber = (user) => user.email === email;
  const index = users.findIndex(isLargeNumber);
  var token = '';
//res.json({ sucess:true, message:'Hello word !'});


    if (index > -1 && users[index].password === pwd){

        if (users[index].role == 'admin') {
          console.log("role Admin");
          token = jwt.sign({ iss: 'http://localhost:4201', email:req.body.email , role: 'admin'} , secret, {
              algorithm: 'HS256',
              expiresIn: 60 * 60
          });
        }else {
          console.log("role user");
          token = jwt.sign({ iss: 'http://localhost:4201', email:req.body.email , role: 'user'} , secret, {
              algorithm: 'HS256',
              expiresIn: 60 * 60
          });
        }
        console.log('login sucess');
        delete req.body.password;

        console.log('token:', token)

        res.json({ sucess: true, token: token})
    }else {
        console.log('login failed');
        res.json({ error: false, message:"vous n éte pas connecté"})
    }
}else {
    console.log('login failed , manque de donnée');
    res.json({sucess:false,message:"vous n éte pas connecté , données manquantes"})
}

});

auth.post('/register', (req, res) => {
  if (req.body){
    const login = req.body.email.toLowerCase().trim();
    const pwd = req.body.password.toLowerCase().trim();
    const nickname = req.body.pseudo.toLowerCase().trim();
    const id = Date.now();
    users = [{id:id,email:login,password:pwd} ,...users];
     res.json({sucess:true,users:users})
  }else{
    res.json({sucessfalse,message:'rejected creation'})
  }

});


app.use('/api', api);
app.use('/auth', auth);


app.listen(port, () =>  { // ecoute du serveur sur le port 8080
    console.log('le serveur fonctionne '+ port)
});
