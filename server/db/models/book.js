const Sequelize = require('sequelize')
const db = require('../db');


const Book = db.define('book', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Book;
