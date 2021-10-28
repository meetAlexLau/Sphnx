require('dotenv').config();
let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');
const path = require("path")
const PORT = process.env.PORT || 4000;
const cookieSession= require('cookie-session');

mongoose.connect("mongodb+srv://masong:12345@cluster0.aravz.mongodb.net/Sphnx?retryWrites=true&w=majority", { useNewUrlParser: true}).then(() => {
    console.log("MongoDB database connection established successfully");
}, error => {
    console.log(error);
    console.log("Local Database Error Connection");
});

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use(express.static(path.resolve(__dirname, "client", "build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
})


const port = process.env.PORT || PORT;
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})

//404 Error
app.use((req, res, next) => {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
