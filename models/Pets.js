const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pets extends Model {}

Pets.init(
   {
       id: {
           type:DataTypes.INTEGER,
           allowNull: false,
           primaryKey: true,
           autoIncrement: true,

       },
       name: {
           type: DataTypes.STRING
       },
       breed:{
           type: DataTypes.STRING
       }
   },
   {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'pets',
  }
)
module.exports = Pets;