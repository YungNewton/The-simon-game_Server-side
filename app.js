const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;
const mongoose = require('mongoose');
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

// if(User.find(admin).exec){
//     console.log(`${admin.userName} already in database`)
// }else{
//     admin.save();
//     console.log(`${admin.userName} added to database`)
// }
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
        Email: req.body.userMail,
        userName: req.body.user_name,
        userPassword: req.body.userPass

    })
    User.findOne({Email: req.body.userMail}.then(foundMail=>{
        if(err){
            console.log(err)
        }else{
            res.write(`<h1>Welcome ${foundMail}</h1>`)
        }
    }))
    res.send(`<h1>Welcome ${newUser.userName}</h1>`)
})
app.post('/login',(req, res)=>{
    res.render('login')
})
app.post('/userLogin',(req, res)=>{
    res.send("<h1>Logging In</h1>");
})
app.post("/back",(req, res)=>{
    res.render('game_play.ejs');
})
app.listen(port,()=>{
    console.log('server running on port '+port);
})