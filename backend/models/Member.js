module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Member", {
    // Frontend mapping fields
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
    
    // Auto-generated external ID as primary key
    externalId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    
    // Legacy fields (keep for compatibility)
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    fechaNacimiento: DataTypes.STRING,
    codigoCliente: DataTypes.STRING,
    codigoCampaña: DataTypes.STRING,
    tipoCliente: DataTypes.STRING,
    telefono: DataTypes.STRING,
    genero: DataTypes.STRING,
    puntos: DataTypes.INTEGER,
    idExterno: DataTypes.STRING,
  });
};
