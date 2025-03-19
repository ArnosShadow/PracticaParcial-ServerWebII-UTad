const bcryptjs = require("bcryptjs");


const cifrar =async  (password) =>{
    const hash=await bcryptjs.hash(password, 10);
    return hash

}

module.exports = {cifrar};