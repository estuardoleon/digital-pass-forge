const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const db = require("../models");
const Member = db.Member;

const upload = multer({ dest: "uploads/" });

exports.importCSV = [
  upload.single("csvFile"),
  async (req, res) => {
    try {
      const results = [];
      const existingIds = [];
      
      // Leer archivo CSV
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", async () => {
          try {
            // Verificar duplicados
            const idsToCheck = results.map(row => row.idExterno).filter(Boolean);
            const existing = await Member.findAll({
              where: { idExterno: idsToCheck },
              attributes: ["idExterno"]
            });
            
            const existingIds = existing.map(member => member.idExterno);
            const newMembers = results.filter(row => 
              row.idExterno && !existingIds.includes(row.idExterno)
            );
            
            // Insertar nuevos miembros
            if (newMembers.length > 0) {
              await Member.bulkCreate(newMembers);
            }
            
            // Limpiar archivo temporal
            fs.unlinkSync(req.file.path);
            
            res.json({ 
              message: `${newMembers.length} miembros importados correctamente`,
              duplicados: existingIds.length,
              total: results.length
            });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
];

exports.exportCSV = async (req, res) => {
  try {
    const members = await Member.findAll();
    
    const csvWriter = createCsvWriter({
      path: "exports/members.csv",
      header: [
        { id: "nombre", title: "nombre" },
        { id: "apellido", title: "apellido" },
        { id: "fechaNacimiento", title: "fechaNacimiento" },
        { id: "email", title: "email" },
        { id: "telefono", title: "telefono" },
        { id: "genero", title: "genero" },
        { id: "puntos", title: "puntos" },
        { id: "idExterno", title: "idExterno" }
      ]
    });
    
    await csvWriter.writeRecords(members);
    res.download("exports/members.csv");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};