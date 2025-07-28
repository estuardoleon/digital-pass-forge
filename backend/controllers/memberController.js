const { nanoid } = require("nanoid"); // 👈 importar nanoid
const db = require("../models");
const Member = db.Member;

exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.findAll();
    res.json(members);
  } catch (error) {
    console.error("Error al obtener miembros:", error);
    res.status(500).json({ error: "Error al obtener miembros" });
  }
};

exports.createMember = async (req, res) => {
  try {
    // Generar ID único
    const externalId = nanoid(10);

    // Crear objeto con campos modernos + campos legacy renombrados
    const memberData = {
      ...req.body,
      external_id: externalId,

      // Campos legacy (renombrados)
      nombre_legacy: req.body.firstName,
      apellido_legacy: req.body.lastName,
      telefono_legacy: req.body.mobile,
      tipoCliente_legacy: req.body.tier,
      puntos_legacy: req.body.points,
      genero_legacy: req.body.gender,
      fechaNacimiento_legacy: req.body.dateOfBirth,
      idExterno_legacy: externalId
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
  try {
    await Member.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Miembro actualizado" });
  } catch (error) {
    console.error("Error al actualizar el miembro:", error);
    res.status(500).json({ error: "Error al actualizar el miembro" });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    await Member.destroy({ where: { id: req.params.id } });
    res.json({ message: "Miembro eliminado" });
  } catch (error) {
    console.error("Error al eliminar el miembro:", error);
    res.status(500).json({ error: "Error al eliminar el miembro" });
  }
};
