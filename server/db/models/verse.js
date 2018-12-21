const Sequelize = require('sequelize')
const db = require('../db');


const Verse = db.define('verse', {
  number: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  catagory: {
    type: Sequelize.STRING
  },
  comments: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  }
})

module.exports = Verse;
