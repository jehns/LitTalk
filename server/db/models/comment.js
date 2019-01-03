const Sequelize = require('sequelize')
const db = require('../db');


const Comment = db.define('comment', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  votes: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  date: {
    type: Sequelize.STRING,
    defaultValue: (new Date()).toDateString()
  }
})

module.exports = Comment;
