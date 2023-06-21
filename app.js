const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

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