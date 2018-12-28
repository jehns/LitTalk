const {db, Book, Verse, User, Comment} = require('./server/db')

const users = [
  {name: 'Stuart', email: 'sj@gmail.com', password: '123'},
  {name: 'Phil', email: 'pw@gmail.com', password: 'abc'},
  {name: 'Brendan', email: 'wow@hotmail.com', password: 'password'},
];

const books = [
  { name: 'Luke' }
];

const verses = [
  { verse: 1, chapter: 1, catagory: 'Intolerence', content: 'Forasmuch as many have taken in hand to set forth in order a declaration of those things which are most surely believed among us, god is upon the richeous of all men.', annotation: "Zacharias and Elizabeth were both getting old, too old to have kids. But Zach prayed.", bookId: 1},
  { verse: 2, chapter: 1, catagory: 'Violence', content: 'Even as they delivered them unto us, which from the beginning were eyewitnesses, and ministers of the word;', annotation: "Zacharias and Elizabeth were both getting old, too old to have kids. But Zach prayed, so an angel appeared to tell him that God would take care of things for him. God would somehow get Liz pregnant and she'd have a son named John, who would be filled with the Holy Ghost from the moment God, the angel, the Holy Ghost, or Zach (or maybe all of them working together) got his mom pregnant.", bookId: 1},
  { verse: 3, chapter: 1, catagory: 'Violence', content: 'Beginning from the baptism of John, unto that same day that he was taken up from us, must one be ordained to be a witness with us of his resurrection.', annotation: "Now this man purchased a field... and falling headlong, he burst asunder... and all his bowels gushed out.", bookId: 1},
  { verse: 1, chapter: 2, catagory: 'Violence', content: 'For unto you is born this day in the city of David a Saviour, which is Christ the Lord.', annotation: 'On earth peace, good will toward men.', bookId: 1},
  { verse: 2, chapter: 2, catagory: 'Intolerence', content: 'And it was known unto all the dwellers at Jerusalem; insomuch as that field is called in their proper tongue, Aceldama, that is to say, The field of blood.', annotation: "The number of names together were about an hundred and twenty.", bookId: 1}
];

const comments = [
  {content: "Whales are just like jesus aren't they?", userId: 1, verseId: 1,},
  {content: "Neo wouldn't talk if zion was under attack.", userId: 2, verseId: 1,},
  {content: "I think god is stupid just like my horse", userId: 1, verseId: 2, },
  {content: "In no time ill be no time!", userId: 2, verseId: 2,},
  {content: "I love ponies. but jesus is my only pony.", userId: 3, verseId: 3,},
  {content: "What does a guy gatta do to get some JESUS, am i right?", userId: 3, verseId: 4,},
  {content: "You're right", userId: 1, verseId: 4,}
]


const seed = async () => {
  await db.sync({force: true})

  // seed your database here!
  await Promise.all(users.map(user =>
    User.create(user)))

  await Promise.all(books.map(book =>
    Book.create(book)))

  await Promise.all(verses.map(verse =>
    Verse.create(verse)))

  await Promise.all(comments.map(comment =>
    Comment.create(comment)))

  console.log('Seeding success!')
  db.close()
}

seed()
  .catch(err => {
    console.error('Oh noes! Something went wrong!')
    console.error(err)
    db.close()
  })
