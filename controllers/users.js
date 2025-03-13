const UserModel = require("../models/users");


const createItem = async(req, res) =>{

    try{
        const result =await UserModel.create(req.body);
        console.log("Recurso creado: "+result);
        res.status(201).send(result);
    }catch(err){
        console.err("ERROR: No se ha podido crear el usuario: "+ err);
        res.status(404).send();
    }

}


module.exports = createItem;