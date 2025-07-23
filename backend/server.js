const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const db = require("./models");
db.sequelize.sync(); // crea tablas si no existen

const memberRoutes = require("./routes/memberRoutes");
app.use("/api/members", memberRoutes);

const PORT = process.env.PORT || 3900;
app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});
