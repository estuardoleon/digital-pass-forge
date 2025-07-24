const { nanoid } = require("nanoid"); // 👈 importar nanoid
const db = require("../models");
const Member = db.Member;

exports.getAllMembers = async (req, res) => {
  const members = await Member.findAll();
  res.json(members);
};

exports.createMember = async (req, res) => {
  try {
    // Generate unique external ID
    const externalId = nanoid(10);

    // Map frontend fields to backend and include auto-generated externalId
    const memberData = {
      ...req.body,
      externalId: externalId,
      
      // Map legacy fields for compatibility
      nombre: req.body.firstName,
      apellido: req.body.lastName,
      telefono: req.body.mobile,
      tipoCliente: req.body.tier,
      puntos: req.body.points,
      genero: req.body.gender,
      fechaNacimiento: req.body.dateOfBirth,
      idExterno: externalId
    };

    const newMember = await Member.create(memberData);
    
    res.json({ 
      message: "Miembro creado exitosamente", 
      member: newMember,
      externalId: externalId 
    });
  } catch (error) {
    console.error("Error al crear el miembro:", error);
    res.status(500).json({ error: "Error al crear el miembro" });
  }
};

exports.updateMember = async (req, res) => {
  await Member.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "Miembro actualizado" });
};

exports.deleteMember = async (req, res) => {
  await Member.destroy({ where: { id: req.params.id } });
  res.json({ message: "Miembro eliminado" });
};
