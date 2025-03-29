
const CompanyModel = require("../models/company");
const UserModel = require("../models/users");

const {handleHttpError}= require("../utils/handleError");

const actualizarItem=async (req, res) =>{
  let descripcion_error = "Error al actualizar los datos personales";
  let codigo_error = 500;
  try{
    const email = req.body.email;
    const user=await UserModel.findOneAndUpdate({email}, {
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      nif: req.body.nif
    });
    res.status(200).json({
        _id: user._id,
        email: user.email,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        nif: req.body.nif,
        estadoValidacion: user.estadoValidacion,
        role: user.role
    });
  }catch(err){
    handleHttpError(res, descripcion_error, codigo_error);
  }
}

const incluirItem= async (req,res) =>{
  let descripcion_error = "Error al incluir los datos de la compañia"
  let codigo_error = 500;
  try {
    let companyData= req.body.company;
    let user= await UserModel.findOne({email: req.body.email})

    if (req.body.esAutonomo) {
      companyData = {
        nombre: user.nombre,
        cif: user.nif,
        direccion: user.direccion,
        provincia: "No aplica",
        pais: "No aplica"
      };
    }

    const nuevaCompania = await CompanyModel.create(companyData);
    user= await UserModel.findOneAndUpdate({email: req.body.email},{companyId: nuevaCompania._id})

    res.status(200).json({
      _id: user._id,
      email: user.email,
      nombre: user.nombre,
      apellido: user.apellido,
      nif: user.nif,
      estadoValidacion: user.estadoValidacion,
      role: user.role,
      company: {
        _id: nuevaCompania._id,
        nombre: nuevaCompania.nombre,
        cif: nuevaCompania.cif,
        direccion: nuevaCompania.direccion,
        provincia: nuevaCompania.provincia,
        pais: nuevaCompania.pais
      }
    });
  } catch (err) {
    handleHttpError(res, descripcion_error, codigo_error);  
  }
};

const obtenerDatos =  async (req, res) => {
  let descripcion_error = "ERROR_GET_USER";
  let codigo_error = 500
  try {
    const user = await UserModel.find({deleted: false});
    res.status(200).json(user);
  } catch (err) {
    handleHttpError(res, descripcion_error, codigo_error);
  }
}
const obtenerDato =  async (req, res) => {
  let descripcion_error = "ERROR_GET_USER";
  let codigo_error = 500
  try {
    const user = await UserModel.findOne({email: req.params.email, deleted: false});
    if(user == null){
      descripcion_error="Usuario no encontrado"
      codigo_error=404
      throw err;
    }
    res.status(200).json(user);
  } catch (err) {
    handleHttpError(res, descripcion_error, codigo_error);
  }
}

const eliminarDato = async (req, res) => {
  try {
    let mensaje;
    if (req.query.soft !== "false") {
      const user = await UserModel.findOneAndUpdate({email:req.params.email}, { deleted: true });
      mensaje= "Usuario desactivado (soft delete): " + user;
    } else {
      await UserModel.findOneAndUpdate(req.params.email);
      mensaje ="Usuario eliminado permanentemente";
    }
    res.status(200).json({ message: mensaje });
    
  } catch (err) {
    handleHttpError(res, "ERROR_DELETE_USER", 500);
  }
}
const recuperarCuenta = async (req, res) => {
  let descripcion_error = "ERROR_RECOVER_ACCOUNT"
  let codigo_error = 500
  try {
    const user = await UserModel.findOneAndUpdate({email: req.params.email},{ deleted: false });

    if (!user){
      codigo_error=404
      descripcion_error="Usuario no encontrado"
      throw err;
    }

    res.status(200).json({ user });
  } catch (err) {
    handleHttpError(res, descripcion_error, codigo_error);
  }
}

module.exports = { actualizarItem,incluirItem, obtenerDatos, obtenerDato, eliminarDato,eliminarDato, recuperarCuenta };

