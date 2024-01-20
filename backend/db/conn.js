import sequelize from 'sequelize';
import pg from 'pg';

export const conn = new sequelize({
    port: 5432,
    database: 'crud',
    username: 'postgres',
    password: '1234',
    dialect: 'postgres',
    dialectModule: pg
});

(async () => {
    try {
        await sequelizeConn.authenticate();
        console.log('> DB Ok');
    } catch (error) {
        console.log(`> DB Error: ${error}`);
    }
})();
