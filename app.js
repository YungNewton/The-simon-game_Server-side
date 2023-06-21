const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

app.set('view engine', 'ejs');

app.get('/',(req, res)=>{
    res.send("<h1>Connected</h1>");
})

app.listen(port,()=>{
    console.log('server running on port '+port);
})