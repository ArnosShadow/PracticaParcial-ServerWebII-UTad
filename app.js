const express = require("express")
const cors = require("cors")
const dbConnect = require("./config/mongo")

dbConnect();
const app = express();

//Le decimos a la app de express() que use cors para evitar errores Cross-Domain.
app.use(cors());
app.use(express.json());

const port = precess.env.PORT || 3001

app.listen(port, ()=>{

    console.log("Servidor escuchando por el puerto "+ port);

})