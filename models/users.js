const mongoose = require("mongoose")


const UserScheme = new mongoose.Schema(
    {
        email:{
            type:String
        },
        password:{
            type:String
        }
    },
    {
        timestamps: true, // createdAt, updatedAt
        versionKey: false
    }
)

// “users” es el nombre de la colección en mongoDB (o de la tabla en SQL)
module.exports = mongoose.model("users", UserScheme);