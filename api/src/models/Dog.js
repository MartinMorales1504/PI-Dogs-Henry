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
    img: {
      type: DataTypes.STRING(2000),
      allowNull: false,
      defaultValue: 'https://cdn.shopify.com/s/files/1/0093/8432/9313/articles/Blog_Tieraa_Canina_Huella_perro_1024x1024.jpg?v=1593022994'
    },
    // evito crear las columnas default
  },
    { timestamps: false });

};
