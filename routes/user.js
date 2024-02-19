const express = require("express");

const router = express.Router();

const usercontroller = require('../contollers/user');

router.post('/add-user',usercontroller.adduser);

router.get('/get-user',usercontroller.getuser);

router.delete('/delete-user/:id', usercontroller.deleteuser);

module.exports = router;
