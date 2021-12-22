const express = require ("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require ("dotenv").config();


//port to run on server.if we host it we can't sure 8070 will be free or not.
//because of that we write this command to run any free port
const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

//connect the DB
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useCreateIndex : true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:true
});

const connection = mongoose.connection;

//open the connection which is made before
connection.once("open", ()=> {
    console.log("MongoDB Connection Successfull");
})

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`);
}) 