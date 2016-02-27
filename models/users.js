/**
 * Created by jeffchang on 2016-02-27.
 */
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
            }
        }
    });
    return User;
};
