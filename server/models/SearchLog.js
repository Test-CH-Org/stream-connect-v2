const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class SearchLog extends Model { }

SearchLog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "user",
            key: "id",
        },
    },
    search: {
        //Longest movie name ever:
        //Night of the Day of the Dawn of the Son of the Bride of the Return of the Revenge of the Terror of the Attack of the Evil, Mutant, Alien, Flesh Eating, Hellbound, Zombified Living Dead Part 2
        type: DataTypes.STRING(256),
        allowNull: false,
    }},
    {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "searchlog", 
});

module.exports = SearchLog;

