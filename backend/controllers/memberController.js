const db = require("../models");
const Member = db.Member;

exports.getAllMembers = async (req, res) => {
  const members = await Member.findAll();
  res.json(members);
};

exports.createMember = async (req, res) => {
  await Member.create(req.body);
  res.json({ message: "Miembro creado" });
};

exports.updateMember = async (req, res) => {
  await Member.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "Miembro actualizado" });
};

exports.deleteMember = async (req, res) => {
  await Member.destroy({ where: { id: req.params.id } });
  res.json({ message: "Miembro eliminado" });
};
