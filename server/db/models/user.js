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
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  biography: {
    type: Sequelize.TEXT
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: 'https://image.flaticon.com/icons/svg/145/145867.svg'
  },
  upVotes: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  },
  downVotes: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    defaultValue: []
  }

})

module.exports = User;
