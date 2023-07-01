const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const encrypt = reuire('mongoose-encryption');
let password = encodeURIComponent("Dbeastinme1#");
const dbUri =`mongodb+srv://Dbeast:${password}@clustersimon.y8amiow.mongodb.net/?retryWrites=true&w=majority`
async function connect(){
    try{
        await mongoose.connect(dbUri)
        console.log('connected to database succesfully')
    }catch(error){
        console.log(`Error -> ${error}`)
    }
}
connect();
const userShcema = new mongoose.Schema({
    Email: String,
    userName: String,
    userPassword: String
})
const highscoresSchema = new mongoose.Schema({
    playerName: userShcema,
    playerScore: Number
})
const Score = mongoose.model("Scores", highscoresSchema)
const User = mongoose.model('Users',userShcema)
const admin = new User({
    userName: "Newton"
})
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.get('/',(req, res)=>{
    res.render('index');
})
app.get('/gameplay',(req, res)=>{
    res.render('game_play.ejs');
})
app.post('/user', (req, res)=>{
    let newUser = new User({
        Email: req.body.user_name,
        userName: req.body.userMail
    })
    if(newUser.Email==="" || newUser.userName===""){
        res.send(`<h1>Empty fields</h1>`)
    }else{
        User.find({Email: req.body.user_name})
        .then(function (found) {
            if(found==""){
                res.send(`<h1>User ${newUser.Email} registered</h1>`)
                newUser.save()
            }else{
                res.write(`<h1>Welcome ${found[0].userName}</h1>`)
            }
        })
        .catch(function (err) {
            console.log(err);
        });
    }
})
app.get('/login',(req, res)=>{
    res.render('login')
})
app.post('/userLogin',(req, res)=>{
    Email = req.body.user_name
    User.find({Email: req.body.user_name})
    .then(function (found) {
        if(found==""){
            res.send(`<h1>User ${found[0].Email} does not exist, Please login</h1>`)
            newUser.save()
        }else{
            res.send(`<h1>Welcome ${found[0].userName}</h1>`)
        }
    })
    .catch(function (err) {
        console.log(err);
    });
})
app.listen(port,()=>{
    console.log('server running on port '+port);
})