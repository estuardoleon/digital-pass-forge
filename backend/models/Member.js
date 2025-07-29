module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Member", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    external_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaNacimiento: DataTypes.STRING,
    codigoCliente: DataTypes.STRING,
    codigoCampaña: DataTypes.STRING,
    tipoCliente: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    telefono: DataTypes.STRING,
    puntos: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    genero: DataTypes.STRING,
    fechaCreacion: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    fechaExpiracion: DataTypes.DATE
  }, {
    tableName: 'members',
    timestamps: false,
  });
};
