const mongoose = require('mongoose');
const slugify = require('slugify');

const connection = mongoose.createConnection('mongodb+srv://sioutis:dimitris123@cluster0.gn78i2u.mongodb.net/blog?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true //slug is used as the link to the article so we need to make sure every slug its unique
    },
    sanitizedHtml: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
})

const PlayerSchema = new mongoose.Schema({
    firstname: {
        type: String,
    },
    lastname: {
        type: String
    },
    number: {
        type: Number
    },
    birthday: {
        type: Date
    },
    position: {
        type: String
    },
    appearances: {
        type: Number
    },
    goals: {
        type: Number
    },
    image: {
        type: String
    },
    slug: {
        type: String,
        unique: true 
    },
    info: {
        type: String
    }
})
ArticleSchema.pre('validate', function (next) { //this function runs anytime before we save,delete,edit an article
    if (this.title) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        }) //strict:true gets rid of all unecassery characters
    }
    next()
})

PlayerSchema.pre('validate', function (next) { //this function runs anytime before we save,delete,edit an article
    if (this.firstname) {
        if(this.lastname){
            this.slug = slugify(this.firstname+this.lastname, {
                lower: true,
                strict: true
            })
        }   
    }
    next()
})

const Article = connection.model('Article', ArticleSchema);
const Player = connection.model('Player',PlayerSchema);
const User = connection.model('User',UserSchema);

// Expose the connection
module.exports = connection;