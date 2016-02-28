/**
 * Created by reed on 2/27/16.
 */
module.exports = function (sequelize, DataTypes) {
    var Course = sequelize.define('Course', {
        title : DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                //Course.hasMany(models.Tag, { through: 'CourseTags' });
                //Course.hasMany(models.Post, { as: 'Post', foreignKey: 'course_id' });
            }
        }
    });
    return Course;
};
