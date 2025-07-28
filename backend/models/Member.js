module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Member", {
    external_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    tier: DataTypes.STRING,
    points: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    dateCreated: DataTypes.STRING,
    expiryDate: DataTypes.STRING,
    dateOfBirth: DataTypes.STRING,

    // Campos legacy sin duplicar nombres
    nombre_legacy: DataTypes.STRING,
    apellido_legacy: DataTypes.STRING,
    telefono_legacy: DataTypes.STRING,
    tipoCliente_legacy: DataTypes.STRING,
    genero_legacy: DataTypes.STRING,
    puntos_legacy: DataTypes.INTEGER,
    fechaNacimiento_legacy: DataTypes.STRING,
    idExterno_legacy: DataTypes.STRING,
    codigoCliente: DataTypes.STRING,
    codigoCampaña: DataTypes.STRING,
  }, {
    tableName: 'members',
    timestamps: false,
  });
};
