
module.exports = (sequelize, DataType ) =>
    sequelize.define("shopping_cart", {
        cart_id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: {
            type: DataType.INTEGER,
            allowNull: false
        },
        price: {
            type: DataType.FLOAT,
            allowNull: false

        }
    }
    ,{
        timestamps: false
    })