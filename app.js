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
const highscoresSchema = new mongoose.Schema({
    playerName: String,
    playerScore: Number
})
const Score = mongoose.model("scores", highscoresSchema)
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.get('/',(req, res)=>{
    res.render('index');
})
app.get('/gameplay',(req, res)=>{
    res.render('game_play.ejs');
})

app.listen(port,()=>{
    console.log('server running on port '+port);
})