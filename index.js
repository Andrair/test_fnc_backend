const express = require("express");
const cors = require("cors");

//Crear el servidor
const app = express();

//Habilitar cors
app.use(cors());

//Permitir leer datos que el usuario coloque
app.use(express.json({ extended: true }));

app.use("/api/tasks", require("./routes/tasks"));

//Puerto de la app y escucha
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
