const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.UUID, //Sequelize can generate UUIDs automatically for these fields
      allowNull: false,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4 // chances of collision are practically none
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    average_height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    average_weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    average_lifeSpan: {
      type: DataTypes.INTEGER,
    },
    createdInDataBase: { //Me ayuda a identificar que fue creado en la base de datos para acceder a ella
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    // evito crear las columnas default
  },
    { timestamps: false });

};
