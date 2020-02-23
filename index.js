const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./app/routes')
const prefix = require('./config/prefix')

const app = express();
app.use(`${prefix}/images`,express.static( 'images/products'));
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", 'GET, POST, PUT, DELETE')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Authentication")
    next();
})
app.use(bodyParser.urlencoded({extended: false, limit: '1mb'}));
app.use(bodyParser.json({limit: '1mb'}))
routes(app)

app.listen(process.env.PORT || 4000,()=>{
    console.log(`Server runing on port ${process.env.PORT}`);
})