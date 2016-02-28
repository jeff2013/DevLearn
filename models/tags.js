/**
 * Created by reed on 2/27/16.
 */
module.exports = function (sequelize, DataTypes) {
    var Tag = sequelize.define('Tags', {
        title : DataTypes.STRING,
        thumbnail_url : DataTypes.STRING,
        popularity : DataTypes.INTEGER,
    }, {
        classMethods: {
            associate: function (models) {
                Tag.belongsToMany(models.Post, {through: 'PostTags'});
                Tag.belongsToMany(models.Course, {through: 'CourseTags'});
            }
        }
    });
    return Tag;
};
