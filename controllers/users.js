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

        console.log(codigoAleatorio);
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
/*

*/const validateItem = async (req, res) => {
    let descripcion_error = "Error en el servidor: ";
    let codigo_error = 500;

    try {
        const email = req.body.email;
        const code = req.body.code;

        if (!email || !code) {
            descripcion_error = "Faltan datos obligatorios";
            codigo_error = 400;
            throw new Error("Datos incompletos");
        }

        if ((code.toString()).length !== 6) {
            descripcion_error = "El código debe ser de 6 dígitos numéricos";
            codigo_error = 400;
            throw new Error("Código mal formado");
        }

        const usuario = await UserModel.findOne({ email });

        if (!usuario) {
            descripcion_error = "Usuario no encontrado";
            codigo_error = 404;
            throw new Error("No existe el usuario");
        }

        if (code !== usuario.codigoValidacion) {
            descripcion_error = "Código de validación incorrecto";
            codigo_error = 400;
            throw new Error("Código inválido");
        }

        usuario.estadoValidacion = "Validado";
        await usuario.save();

        res.status(200).json({ message: 'Usuario valido' });

    } catch (err) {
        handleHttpError(res, descripcion_error + err.message, codigo_error);
    }
};

module.exports = {createItem,validateItem};