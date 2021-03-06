const Sequelize = require('sequelize')
const db = require('../db');


const Verse = db.define('verse', {
  verse: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  chapter: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  catagory: {
    type: Sequelize.STRING
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  annotation: {
    type: Sequelize.TEXT
  }
})

module.exports = Verse;
