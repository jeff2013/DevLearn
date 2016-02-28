/**
 * Created by reed on 2/27/16.
 */
module.exports = function (sequelize, DataTypes) {
    var Post = sequelize.define('Posts', {
        title : DataTypes.STRING,
        // Data types are as follows
        // 0 is text, 1 is video
        type : DataTypes.INTEGER,
        // Content is based off of what type it is
        // IE: video would be url to video
        // Or Text would just be text, etc
        content : DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                Post.belongsTo(models.User, { as: 'Posts', foreignKey: 'user_id'});
                //Post.hasMany(models.Tag, { through: 'PostTags'});
            }
        }
    });
    return Post;
};
