const {verifyToken} = require("../utils/handleJWT");
const CompanyModel = require("../models/company");
const UserModel = require("../models/users");

const {handleHttpError}= require("../utils/handleError");

const actualizarItem=async (req, res) =>{
  let descripcion_error = "Error al actualizar los datos personales";
  let codigo_error = 500;
  try{
    const email = req.body.email;
    if(result){
        const user=UserModel.findOneAndReplace({email: email}, {
            nombre: data.nombre,
            apellido: data.apellido,
            nif: data.nif
        });

        res.status(200).json({
            _id: user._id,
            email: user.email,
            nombre: data.nombre,
            apellido: data.apellido,
            nif: data.nif,
            estadoValidacion: user.estadoValidacion,
            role: user.role
        });
    }
  }catch(err){
    handleHttpError(res, descripcion_error, codigo_error);
  }
}

const incluirItem= async (req,res) =>{
  let descripcion_error = "Error al incluir los datos de la compañia"
  let codigo_error = 500;
  try {
    const result = await CompanyModel.create(req.body.company);
    const user= await UserModel.findOneAndUpdate({email: req.body.email},{companyId: result._id})
    
    res.status(200).json({
      _id: user._id,
      email: user.email,
      nombre: data.nombre,
      apellido: data.apellido,
      nif: data.nif,
      estadoValidacion: user.estadoValidacion,
      role: user.role,
      //TODO incluir la compañia
    });
  } catch (err) {
    handleHttpError(res, descripcion_error, codigo_error);  
  }
};
module.exports = { actualizarItem,incluirItem };

