const User = require('./user')
const Book = require('./book')
const Verse = require('./verse')
const db = require('../db');

//  Book.hasMany(Chapter);
//  Chapter.belongsTo(Book);

//  Chapter.hasMany(Verse);
//  Verse.belongsTo(Chapter);

 Book.hasMany(Verse);
 Verse.belongsTo(Book);



module.exports = {
  db,
  User,
  Book,
  Verse
}
