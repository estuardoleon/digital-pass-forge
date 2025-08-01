const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión y sincronización de BD
const db = require("./models");
db.sequelize.sync(); // crea tablas si no existen

// Rutas
const memberRoutes = require("./routes/memberRoutes");
const authRoutes = require("./routes/authRoutes");
const csvRoutes = require("./routes/csvRoutes");

app.use("/api/members", memberRoutes);
app.use("/api/auth", authRoutes);      // ✅ Agregada
app.use("/api/csv", csvRoutes);        // ✅ Agregada

// Levantar servidor
const PORT = process.env.PORT || 3900;
app.listen(PORT, () => {
  console.log(`✅ Servidor backend corriendo en http://localhost:${PORT}`);
});
