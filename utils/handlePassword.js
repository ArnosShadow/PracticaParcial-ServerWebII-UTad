const bcryptjs = require("bcryptjs");


const cifrar =async  (password) =>{
    try{
        const hash=await bcryptjs.hash(password, 10);
        return hash
    }catch(err){
        console.error("ERROR: Se a producido un error en el cifrado");
    }

}

module.exports = {cifrar};