const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.review = require("./models/review.js")(db.sequelize, DataTypes);
db.product = require("./models/products.js")(db.sequelize, DataTypes);
db.cart = require("./models/shopping_cart.js")(db.sequelize, DataTypes);

// Relate models.
db.review.belongsTo(db.user, { foreignKey: { name: "email", allowNull: false } });
db.review.belongsTo(db.product, { foreignKey: { name: "product_id", allowNull: false } });
db.user.hasMany(db.review, { foreignKey: { name: "email", allowNull: false } } );

// db.post.belongsTo(db.review, { foreignKey: { name: "email", allowNull: false } })

// Learn more about associations here: https://sequelize.org/master/manual/assocs.html

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  await db.sequelize.sync({ force: true });
  
  await seedData();
};

async function seedData() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if(count > 0)
    return;
  else{
    const argon2 = require("argon2");

  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  await db.user.create({
    email: "mbolger@example.com", // Ensure this is a valid email format
    password_hash: hash,
    name: "Matthew",
    dob: "2000-12-12",  // Use YYYY-MM-DD format
    join_date: new Date()  // Automatically set the join_date to the current date and time
  });
  
  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({
    email: "mbolgewr@example.com", // Ensure this is a valid email format
    password_hash: hash,
    name: "Matthew",
    dob: "2000-12-12",  // Use YYYY-MM-DD format
    join_date: new Date()  // Automatically set the join_date to the current date and time
  });

  //sample pridycst
  await db.product.create({
    product_name: "test",
    price: 22.3,
    isSpecial: false
  });
  await db.product.create({
    product_name: "test2",
    price: 26.3,
    isSpecial: true
  });

  // review
  await db.review.create({
    text: 'This is a sample review text.',
    rating: 4.5,
    product_id: 2,
    email: "mbolgewr@example.com"
  })

  await db.review.create({
    text: 'This is a sample review text 2.',
    rating: 0.5,
    product_id: 2,
    email: "mbolgewr@example.com"

  })


  }

  

}

module.exports = db;
