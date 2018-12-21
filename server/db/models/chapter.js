const Sequelize = require('sequelize')
const db = require('../db');


const Chapter = db.define('chapter', {
  number: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Chapter;
