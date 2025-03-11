module.exports = (sequelize, DataTypes) =>
    sequelize.define("product",{
        product_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product_name: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        isSpecial: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }

        
    }
    ,{
        timestamps: false
    })