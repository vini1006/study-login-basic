const express = require("express");
const app = express();
const port = 3000;

app.use('/public',express.static(__dirname + '/public'));
app.set("userInfo", __dirname + "/userInfo");
app.set("public", __dirname + "/public");
app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

const cookieParser = require("cookie-parser");
app.use(cookieParser())

const session = require('express-session');
const session_secret = `session_study`;

app.use(session({
    httpOnly: true // Block the usage of the cookies by javascript
    // , secure : true // only for https
    , secret: session_secret
    , resave: false
    , saveUninitialized: true
    , cookie: {
        //cookie options 
    }
}))

app.get("/", (req, res) => {
    console.log('root')
    res.status(200).send('HI')
})
app.get("/hello", (req, res) => {
    console.log('root')
    res.status(200).send('HELLO USER')
})

const userRouter = require("./routes/user.js")(express)
app.use("/user", userRouter);


app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).send("Error");
});

app.listen(port, () => {
    console.log(__dirname)
    console.log(`Server is running on port 3000...`);
});





