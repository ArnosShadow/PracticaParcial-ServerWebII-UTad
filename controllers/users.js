const { matchedData } = require("express-validator");
const UserModel = require("../models/users");
const { handleHttpError } = require("../utils/handleError");
const {cifrar} = require("../utils/handlePassword");

const createItem = async(req, res) =>{

    try{
        const body = matchedData(req);
        if((typeof body.password) != String){
            body.password=(body.password).toString();
        }

        //ciframos la contraseña
        body.password=await cifrar(body.password);
        console.log(body.password);

        const result =await UserModel.create(body);
        console.log("Recurso creado: "+result);
        res.status(201).send(result);
    }catch(err){
        handleHttpError(res,"ERROR: No se ha podido crear el usuario: "+ err, 400);
    }

}


module.exports = createItem;