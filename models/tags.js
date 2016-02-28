/**
 * Created by reed on 2/27/16.
 */
module.exports = function (sequelize, DataTypes) {
    var Tag = sequelize.define('Tags', {
        title : DataTypes.STRING,
    }, {
        classMethods: {
            associate: function (models) {
                Tag.belongsToMany(model.Post, {through: 'PostTags'});
                Tag.belongsToMany(model.Course, {through: 'CourseTags'});
            }
        }
    });
    return Tag;
};