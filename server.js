require('dotenv').config();
let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
let passport = require('passport');
const path = require("path")
const PORT = process.env.PORT || 3000;
const cookieSession= require('cookie-session');
require('./passport-setup');

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser:  true
}).then(() => {
    console.log("Local Database Connected");
}, error => {
    console.log(error);
    console.log("Local Database Error Connection");
});

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(cookieSession({
    name: 'Sphnx-session',
    keys: ['key1', 'key2']
}))


app.use(passport.initialize()); 
app.use(passport.session());

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('http://localhost:3001/home');
  });

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

/*
app.use(express.static(path.resolve(__dirname, "client", "build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})
*/

const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

//404 Error