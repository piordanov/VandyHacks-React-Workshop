const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// CORS headers so you can ping from your own localhost
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// parse our json post objs
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());

// DO AS I SAY NOT WHAT I DO 
// Use a DB, but not Mongo, unless you don't care about your database actually keeping your data
let db = {
    posts: [
        {
            id: 0,
            title: '10,000 year clock gets lowered into Texan mountain',
            link: 'https://www.theengineer.co.uk/10000-year-clock-texan-mountain/',
        },
        {
            id: 1,
            title: 'React declared best UI framework',
            link: 'https://reactjs.org',
        },
        {
            id: 2,
            title: 'Keras reimplementation of "One pixel attack for fooling deep neural networks',
            link: 'https://github.com/Hyperparticle/one-pixel-attack-keras',
        },

    ],
    comments: [
        {
            id: 0,
            postId: 0,
            author: 'Andrew Stallman',
            text: 'Interesting!'
        },
        {
            id: 1,
            postId: 0,
            author: 'Sudipta Swanakar',
            text: ''
        },
        {
            id: 2,
            postId: 0,
            author: 'author3',
            text: 'hellooo again'
        }
        
    ]
};

// posts endpoint, return list of posts objs
app.get('/posts', (req, res) => {
    res.send(db.posts);
});

// get post by postId
app.get('/posts/:postId', (req, res) => {
    res.send(db.posts.filter((p) => p.id == req.params.postId)[0]);
});

// get all comments given post ID
app.get('/comments/:postId', (req, res) => {
    res.send(db.comments.filter((c) => c.postId == req.params.postId));
});

// get all comments
app.get('/comments', (req, res) => {
    res.send(db.comments);
});

// post comment (add it to array)
app.post('/comments', (req, res) => {
    let comment = req.body;
    console.log(comment);

    db.comments.push(comment);
    res.send(`Success on comment ${comment}`);
});

const port = 3030;
app.listen(port, () => console.log(`Server listening on port ${port}!`));