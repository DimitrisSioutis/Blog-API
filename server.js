const express = require("express");
const connection = require('./database')
const router = require('./router');
const parser = require('body-parser')
const cors = require('cors');
const methodOverride = require('method-override')  //enables us to use .delete
const cookieParser = require('cookie-parser')

connection.on('open',()=>{
    console.log('Database Connected')
})

const app = express();


app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE","PUT"],
    credentials: true
}))



app.use(cookieParser())
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(methodOverride('_method'))


app.use('/api',router)

app.listen( process.env.PORT || 8080)