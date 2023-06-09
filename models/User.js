const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');


class User extends Model{
    checkPassword(loginPassword) {
        return bcrypt.compareSync(loginPassword, this.password)
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        }
    },
    {
        hooks: {
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
               updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
            } 
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: false,
        modelName: 'user'
    }
);

module.exports = User;