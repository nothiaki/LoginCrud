const Sequelize = require('sequelize');
const pg = require('pg');

const sequelize = new Sequelize({
    port: 5432,
    database: 'crud',
    username: 'postgres',
    password: '1234',
    dialect: 'postgres',
    dialectModule: pg
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('> DB Ok');
    } catch (error) {
        console.log(`> DB Error: ${error}`);
    }
})();

module.exports = sequelize;