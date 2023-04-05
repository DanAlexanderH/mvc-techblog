const seedUser = require('./user-seeds');
const seedComment = require('./comments-seeds');
const seedPost = require('./post-seeds');

console.log(seedUser, "HELLO")

const sequelize = require('../config/connection');

const seedAll = async () => {
    console.log("hello")
    await sequelize.sync({ force: true });
    console.log("world")
    console.log("Database synced");
    await seedUser();
    console.log("User Seeded");
    await seedComment();
    console.log("Comment Seeded");
    await seedPost();
    console.log("Post seeded")
};

seedAll();