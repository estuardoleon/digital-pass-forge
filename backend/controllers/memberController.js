const { nanoid } = require("nanoid");
const db = require("../models");
const Member = db.Member;

// Obtener todos los miembros (ordenados por ID y con campos en español mapeados)
exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.findAll({
      order: [["id", "ASC"]] // 👈 ordena por ID ascendente
    });

    const formattedMembers = members.map(member => ({
      id: member.id,
      externalId: member.external_id || member.idExterno,
      firstName: member.nombre,
      lastName: member.apellido,
      mobile: member.telefono,
      tier: member.tipoCliente,
      points: member.puntos,
      gender: member.genero,
      dateOfBirth: member.fechaNacimiento,
      codigoCliente: member.codigoCliente,
      codigoCampaña: member.codigoCampaña,
      email: member.email,
    }));

    res.json(formattedMembers);
  } catch (error) {
    console.error("❌ Error al obtener miembros:", error);
    res.status(500).json({ error: "Error al obtener miembros" });
  }
};

// Crear un nuevo miembro
exports.createMember = async (req, res) => {
  try {
    const externalId = nanoid(10);

    const memberData = {
      external_id: externalId,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      telefono: req.body.telefono,
      tipoCliente: req.body.tipoCliente,
      puntos: req.body.puntos,
      genero: req.body.genero,
      fechaNacimiento: req.body.fechaNacimiento || null,
      codigoCliente: req.body.codigoCliente || null,
      codigoCampaña: req.body.codigoCampaña || null,
      email: req.body.email,
      idExterno: externalId,
    };

    const newMember = await Member.create(memberData);

    res.json({
      message: "Miembro creado exitosamente",
      member: newMember,
      externalId
    });
  } catch (error) {
    console.error("❌ Error al crear el miembro:", error);
    res.status(500).json({ error: "Error al crear el miembro" });
  }
};

// Actualizar miembro
exports.updateMember = async (req, res) => {
  try {
    await Member.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Miembro actualizado" });
  } catch (error) {
    console.error("❌ Error al actualizar el miembro:", error);
    res.status(500).json({ error: "Error al actualizar el miembro" });
  }
};

// Eliminar miembro
exports.deleteMember = async (req, res) => {
  try {
    await Member.destroy({ where: { id: req.params.id } });
    res.json({ message: "Miembro eliminado" });
  } catch (error) {
    console.error("❌ Error al eliminar el miembro:", error);
    res.status(500).json({ error: "Error al eliminar el miembro" });
  }
};
