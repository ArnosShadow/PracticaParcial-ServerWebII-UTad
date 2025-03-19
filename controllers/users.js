const UserModel = require("../models/users");
const { handleHttpError } = require("../utils/handleError");


const createItem = async(req, res) =>{

    try{
        const result =await UserModel.create(req.body);
        console.log("Recurso creado: "+result);
        res.status(201).send(result);
    }catch(err){
        
        handleHttpError(res,"ERROR: No se ha podido crear el usuario: "+ err, 404);
    }

}


module.exports = createItem;