const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      
    },
    weigth: {
      
    },
    lifeSpan: {
      
    },
  
  });
  
};
