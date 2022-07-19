const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temperaments', {
    id: {
        type: DataTypes.UUID, // Sequelize can generate UUIDs automatically for these fields
        allowNull: false,
        primaryKey: true,
        unique: true,
        defaultValue: DataTypes.UUIDV4 // chances of collision are practically none
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },  
    
  },
  {timestamps: false});
  
};