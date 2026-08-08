export { sequelize } from 'sequelize';

const sequelize = new sequelize('taks_users_db', 'root', '', {
    host :'localhost',
    dialect :'mysql',
    logging :'false'
});

export default sequelize;