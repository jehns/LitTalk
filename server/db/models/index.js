const User = require('./user');
const Book = require('./book');
const Verse = require('./verse');
const Comment = require('./comment');
const db = require('../db');

//  Book.hasMany(Chapter);
//  Chapter.belongsTo(Book);

//  Chapter.hasMany(Verse);
//  Verse.belongsTo(Chapter);



//  User.belongsToMany(Comment, {through: 'userComments'});
//  Comment.belongsToMany(User, {through: 'userComments'});

Book.hasMany(Verse);
Verse.belongsTo(Book);

User.hasMany(Comment);
Comment.belongsTo(User);

Verse.hasMany(Comment);
Comment.belongsTo(Verse);



module.exports = {
  db,
  User,
  Book,
  Verse,
  Comment
}
