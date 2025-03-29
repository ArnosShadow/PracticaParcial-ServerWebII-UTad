const express = require("express")
const cors = require("cors")
const dbConnect = require('./config/mongo')
require("dotenv").config();
const router = require("./routes");



dbConnect();
const app = express();

//Le decimos a la app de express() que use cors para evitar errores Cross-Domain.
app.use(cors());
app.use(express.json());
app.use("/routes", router);

const port = process.env.PORT || 3001
app.listen(port, ()=>{

    console.log("Servidor escuchando por el puerto "+ port);

})