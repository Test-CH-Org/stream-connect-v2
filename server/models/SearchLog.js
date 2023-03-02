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
    },
    isActor: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    providerFilter: {
        type: DataTypes.STRING,
        get() {
            return this.getDataValue('providerFilter').split(',');
        },
        set(val) {
            this.setDataValue('providerFilter', val.join(','));
        }
    },
    movieRating: {
        type: DataTypes.STRING,
        get() {
            return this.getDataValue('movieRating').split(',');
        },
        set(val) {
            this.setDataValue('movieRating', val.join(','));
        }
    }
    },
    {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "searchlog", 
});

module.exports = SearchLog;

