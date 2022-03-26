const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UserSearch extends Model {}

UserSearch.init(
    {
        id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
        keyCheck: {
			type: DataTypes.STRING,
		},
        limitCheck: {
			type: DataTypes.INTEGER,
		},
        
    },
    {
		sequelize,
		freezeTableName: true,
		underscored: true,
		modelName: "usersearch",
	}

)
module.exports = UserSearch;