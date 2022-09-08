const express = require("express");
const session = require('express-session');
const connection = require('./database')
const router = require('./router');
const parser = require('body-parser')
const cors = require('cors');
const methodOverride = require('method-override')  //enables us to use .delete
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo');
connection.on('open',()=>{
    console.log('Database Connected')
})

const app = express();
const port = 8080;

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE","PUT"],
    credentials: true
}))

app.use(session({        
    key: 'userId',                                                 // http://expressjs.com/en/resources/middleware/session.html
    secret: 'secret',
    resave: false,                                                          // don't save session if unmodified
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl:'mongodb://localhost/blog'})                                      // don't create session until something stored
}))

app.use(cookieParser())
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(methodOverride('_method'))


app.use('/api',router)

app.listen( port, () => {
    console.log(`server running on port: ${port}`);
})