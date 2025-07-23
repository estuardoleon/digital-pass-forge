module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Member", {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    fechaNacimiento: DataTypes.STRING,
    codigoCliente: DataTypes.STRING,
    codigoCampaña: DataTypes.STRING,
    tipoCliente: DataTypes.STRING,
    email: DataTypes.STRING,
    telefono: DataTypes.STRING,
    genero: DataTypes.STRING,
    puntos: DataTypes.INTEGER,
    idExterno: DataTypes.STRING,
  });
};
