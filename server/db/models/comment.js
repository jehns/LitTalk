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
  date: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  }
})

module.exports = Comment;
