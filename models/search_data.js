
module.exports = function(sequelize, DataTypes){
	const SearchData = sequelize.define('SearchData', {
		data: DataTypes.JSONB
	}, {
		classMethods: {
			associate: function(models){
				SearchData.belongsTo(models.Post)
			}
		}
	})
	return SearchData
}
