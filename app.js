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
User.deleteMany({userName: "Newton"})
if(User.find(admin)){
    console.log(`${admin.userName} already in database`)
    console.log(admin.userName)
}else{
    admin.save();
    console.log(`${admin.userName} added to database`)
}
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
    user = req.body.user_name
    res.redirect('/')
    console.log(user)
})
app.get('/cfaaa5ce-60d2-4bcc-b68d-166e8d94ad01.html',(req, res)=>{
    res.sendFile(__dirname+'/cfaaa5ce-60d2-4bcc-b68d-166e8d94ad01.html');
})
app.listen(port,()=>{
    console.log('server running on port '+port);
})