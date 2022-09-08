const router = require('express').Router();
const connection = require('./database')
const Article = connection.models.Article
const Player = connection.models.Player
const User = connection.models.User

router.get('/',async (req,res)=>{
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.json(articles)
})
router.get('/articles',async (req,res)=>{
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.json(articles)
})

router.get('/players',async (req,res)=>{
    const players = await Player.find().sort({ createdAt: 'desc' })
    res.json(players)
})

router.get('/users',async (req,res)=>{
    const users = await User.find()
    res.json(users)
})

router.post('/articles/new',async (req,res)=>{
    const article = new Article()
    article.title= req.body.title
    article.description= req.body.description
    article.markdown= req.body.markdown
    article.image= req.body.image
    
    await article.save().then(res.json({article}));
})

router.post('/players/new',async (req,res)=>{
    const player = new Player()
    player.firstname = req.body.firstname
    player.lastname = req.body.lastname
    player.number = req.body.number
    player.image= req.body.image
    player.birthday = req.body.birthday
    player.appearances = req.body.appearances
    player.goals = req.body.goals
    player.position = req.body.position
    player.background = req.body.background

    await player.save().then(res.json({player}));
})

router.put('/articles/edit/:_id',async (req,res)=>{

    let article= await Article.findById(req.params._id)
    article.title= req.body.title
    article.description= req.body.description
    article.markdown= req.body.markdown
    article.image= req.body.image
    await article.save().then(res.json({article}));
})

router.put('/players/edit/:_id',async (req,res)=>{

    let player = await Player.findById(req.params._id)
    player.firstname = req.body.firstname
    player.lastname = req.body.lastname
    player.number = req.body.number
    player.image= req.body.image
    player.birthday = req.body.birthday
    player.appearances = req.body.appearances
    player.goals = req.body.goals
    player.position = req.body.position
    player.background = req.body.background
    await player.save().then(res.json({player}));
})

router.delete('/articles/delete/:_id',async (req, res) => {
    await Article.findByIdAndDelete(req.params._id)
})

router.delete('/players/delete/:_id',async (req, res) => {
    await Player.findByIdAndDelete(req.params._id)
})

router.get('/login',(req, res) => {
    if(req.session.isAuth==true){
        res.send(true)
    }
})

router.post('/login', async (req, res) => {
    req.session.isAuth = true
    result = req.session.isAuth
    res.send(result)
})

router.delete('/logout', (req, res) => {
    req.session.destroy((err)=>{
        if(err) throw err
        let result = false
        res.send(result)
    })  
})

module.exports = router; 


