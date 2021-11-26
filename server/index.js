const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser')//no explaination provided in the turorial
const cors = require('cors')//models to fix some error

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Lkmqna19820615ss',
    database: '435project',
    
});
//check connection to mysql 

var storeQuerry = '';

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());//this line of code allow object from front end to be retrive from backend
/*
db.connect(function(error){
    if(error){
        return console.error('error: '+ error.message)
    }else{
        console.log('Mysql Coneected');
    }
})
*/
app.post('/api/submitQuery', (req, res)=>{
    storeQuerry = req.body.searchName;//store the name
    //console.log(req.body.searchName);
    //res.send(storeQuerry);
});

app.get('/api/QueryResult', (req, res)=>{
    var searchQuery = "with allinfo as (select A.breed as breed, A.classification as cla, A.obedience as obedience, A.bgroup as bgroup, B.avgheight, B.avgweight, B.avglifespan from breed as A left join breedavg as B on A.breed = B.breed) select * from allinfo where breed = ? UNION (select * from allinfo where breed LIKE ? or breed LIKE ? limit 20);";
    var similar =  storeQuerry[0] + '%';
    var similar1 = storeQuerry[0] + storeQuerry[1]+'%';
    console.log('This is simialr :' + similar);
    db.query(searchQuery,[storeQuerry, similar1, similar],(err, result)=>{
        res.send(result);//send result of the query to the route
        console.log(err);
        console.log(result);
    });
});



app.get("/api/search",(req, res)=>{//when user access the url then this function will be called
    const selectquery = "SELECT A.breed, A.classification, A.obedience, A.bgroup, B.avgweight, B.avgheight, B.avglifespan from breed as A left join breedavg as B on A.breed = B.breed limit 10;";
    db.query(selectquery, (err, result)=>{
        console.log(result);
        console.log(err);
        res.send(result);
    });
    
});//the app object is set to response with the arrow when client try to access the route,/, is simply the url

/*
app.post('/api/search', (req, res)=>{
    
    const selectquery = "SELECT * FROM movie_reviews";
    db.query(selectquery, (err, result)=>{
        console.log(result);
    });
});
*/
app.listen(3001, ()=>{
    console.log('running on the server');
});//the second parameter is a function