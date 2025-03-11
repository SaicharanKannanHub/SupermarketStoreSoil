
module.exports = (sequelize, DataTypes) =>
    sequelize.define("review",{
        review_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rating: {
            type: DataTypes.DECIMAL,
            allowNull: false,

        }
    },{
        timestamps: false
    }
)