const path = require('path');
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const userroute = require('./routes/user');

const sequelize = require('./util/database');

const app = express();

app.use(cors());
app.use(express.json());
app.use(userroute);


async function func(){
    await sequelize.sync()
    app.listen(3000,()=>console.log("Listening on port 3000"));
}
func();
