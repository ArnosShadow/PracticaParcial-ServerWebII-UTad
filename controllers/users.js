const { matchedData } = require("express-validator");
const UserModel = require("../models/users");
const { handleHttpError } = require("../utils/handleError");
const {cifrar} = require("../utils/handlePassword");
const {comprobarVerificadoEmail} = require("../utils/handleVerificador");

const createItem = async(req, res) =>{
    const descripcion_error = "ERROR: No se ha podido crear el usuario: ";
    const codigo_error = 400
    try{
        const body = matchedData(req);
        if((typeof body.password) != String){
            body.password=(body.password).toString();
        }
        
        //Comprobamos si el correo ya fue verificado.
        if(await comprobarVerificadoEmail(body.email, UserModel)){
            codigo_error=409;
            descripcion_error="ERROR:El email ya está registrado y verificado.";
            throw err;
        }

        //ciframos la contraseña
        body.password=await cifrar(body.password);

        // Se generará un código aleatorio de seis dígitos.
        const codigoAleatorio = Math.floor(100000 + Math.random() * 900000);

        body.codigoValidacion = codigoAleatorio;

        const result =await UserModel.create(body);
        console.log("Recurso creado: "+result);
        res.status(201).send(result);
    }catch(err){
        handleHttpError(res,descripcion_error + err, codigo_error);
    }

}


module.exports = createItem;