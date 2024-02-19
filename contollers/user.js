const User = require('../models/user');

const adduser = async (req, res) => {
    try{
        const name = req.body.name;
        const email = req.body.email;
        const phonenumber = req.body.number;
        console.log(req.body);
        const ID = req.body.id;
        const is_datapresent = await User.findOne({ where: {id: ID } });
        console.log(is_datapresent,"present");
        if (!is_datapresent){
            const data = await User.create({name: name, email: email, phonenumber: phonenumber});
            res.status(201).json({newuserdetails: data});
        }else{
            console.log("data is present");
            const data = await User.update({ name: name, email: email, phonenumber: phonenumber }, { where: { ID } });
            console.log(data,"data");
            res.status(201).json({message: "Successfully updated"});
        }
    }
    catch(err){
        console.log(err)
    }
}

const getuser = async (req, res) => {
    try{
    const users = await User.findAll();
    res.status(200).json(users);
}
catch(err){
    console.log(err)
}
};

const deleteuser = async(req,res)=>{
    try{
    const uid = req.params.id;
    console.log(uid);
    await User.destroy({where: {id: uid}});
    res.status(200).json({});
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {
    adduser,
    getuser,
    deleteuser
};