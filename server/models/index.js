const User = require("./User");
const SearchLog = require("./SearchLog");

// user can have many items
User.hasMany(SearchLog, {
  foreignKey: "user_id",
});

// each item with unique description belongs to one user
SearchLog.belongsTo(User, {
  foreignKey: "user_id",
});


module.exports = { User, SearchLog };