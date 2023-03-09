const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require('uuid');

class User extends Model {
  // set up method to run on instance data (per user) to check password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      isUnique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    lockedOut: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
        },
    loginAttempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    lastLogon: {
      type: DataTypes.STRING
    },
    lastFailedLogin: {
        type: DataTypes.STRING,
    },
    resetKey: {
      type: DataTypes.STRING,
      defaultValue: uuidv4().toString()
    }
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },

      // set up beforeUpdate hashing
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
