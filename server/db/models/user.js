const Sequelize = require('sequelize')
const db = require('../db');


const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://c7.uihere.com/files/340/946/334/avatar-user-computer-icons-software-developer-avatar.jpg'
  }

})

module.exports = User;
