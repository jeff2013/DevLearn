/**
 * Created by reed on 2/27/16.
 */
/**
 * Created by reed on 2/27/16.
 */
module.exports = function (sequelize, DataTypes) {
    var Comment = sequelize.define('Comments', {
        content : DataTypes.STRING,
    }, {
        classMethods: {
            associate: function (models) {
                Comment.belongsTo(models.User, { foreignKey: 'user_id' });
            }
        }
    });
    return Course;
};
