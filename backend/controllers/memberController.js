const { nanoid } = require("nanoid"); // 👈 importar nanoid
const db = require("../models");
const Member = db.Member;

exports.getAllMembers = async (req, res) => {
  const members = await Member.findAll();
  res.json(members);
};

exports.createMember = async (req, res) => {
  try {
    // Generar external_id único
    const externalId = nanoid(10); // ejemplo: 'KJ82DKSL90'

    // Crear el miembro con external_id incluido
    await Member.create({
      ...req.body,
      external_id: externalId,
    });

    res.json({ message: "Miembro creado con external_id" });
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
