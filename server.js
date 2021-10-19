require('dotenv').config();
let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
const path = require("path")
const PORT = process.env.PORT || 3000;

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