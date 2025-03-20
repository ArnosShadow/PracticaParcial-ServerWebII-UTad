const { matchedData } = require("express-validator");
const UserModel = require("../models/users");
const { handleHttpError } = require("../utils/handleError");
const {JWTSign , verifyToken} =require("../utils/handleJWT");
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

        // Generamos un token para pasarselo a nuestro usuario.
        const token=await JWTSign(result);

        res.status(201).json(
            {
                email: result.email,
                Verificado: result.estadoValidacion,
                role: result.role,
                token
            }
        );
    }catch(err){
        handleHttpError(res,descripcion_error + err, codigo_error);
    }

}

const validateItem = async (req, res) =>{
    const descripcion_error = "Error en el servidor ";
    const codigo_error = 500
    try{
        //Extraemos el token.
        email = req.body.email;
        tokenRecibido = (req.headers.Authorization).split(" ")[1];
        code = req.body.code;
        if(verifyToken(tokenRecibido)){
            //Extraemos el email.
            usuario=UserModel.findOne({email: email});
            if((code.toString()).length != 6){
                descripcion_error="'El código debe ser de 6 dígitos numéricos";
                codigo_error=400;
                throw err;
            }
            if(code != usuario.codigoValidacion){
                descripcion_error="Código de validación incorrecto";
                codigo_error=400;
                throw err;
            }

            usuario.estadoValidacion = "Validado";
            await usuario.save();

            res.status(200).json({ message: 'Usuario validado exitosamente' });
        }else{
            descripcion_error="Token inválido";
            codigo_error=401;
            throw err;
        }
    }catch(err){
        handleHttpError(res,descripcion_error + err, codigo_error);
    }


    
}

module.exports = {createItem,validateItem};