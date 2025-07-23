const db = require("../models");
const Member = db.Member;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Buscar usuario por email
    const user = await Member.findOne({ where: { email } });
    
    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }
    
    // Aquí deberías verificar la contraseña encriptada
    // Por simplicidad, asumo que tienes un campo password en Member
    if (user.password !== password) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }
    
    res.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        role: user.role || 'user'
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body;
    
    const user = await Member.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    
    // Verificar contraseña actual
    if (user.password !== currentPassword) {
      return res.status(401).json({ error: "Contraseña actual incorrecta" });
    }
    
    // Actualizar contraseña
    await user.update({ password: newPassword });
    
    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};