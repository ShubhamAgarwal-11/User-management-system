require('dotenv').config({path : "./.env"});
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
require('./config/db')();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(cookieParser());
const corsOptions = {
    origin : true,
    credentials : true
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// router mounting...


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});