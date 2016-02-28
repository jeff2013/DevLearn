/**
 * Created by reed on 2/27/16.
 */
module.exports = function (sequelize, DataTypes) {
    var Course = sequelize.define('Course', {
        title : DataTypes.STRING,
    }, {
        classMethods: {
            associate: function (models) {
                Course.HasMany(models.Tag, { through: 'CourseTags' });
                Course.HasMany(models.Post, { as: 'Posts', foreignKey: 'course_id' });
            }
        }
    });
    return Course;
};
