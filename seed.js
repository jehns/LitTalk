const {db, Book, Verse, User} = require('./server/db')

const users = [
  {name: 'Stuart', email: 'sj@gmail.com', password: '123'},
  {name: 'Phil', email: 'pw@gmail.com', password: 'abc'},
  {name: 'Brian', email: 'wow@hotmail.com', password: 'password'},
];

const books = [
  { name: 'Luke' }
];

// const chapters = [
//   { number: 1, bookId: 1 },
//   { number: 2, bookId: 1 },
//   { number: 3, bookId: 1 }
// ];

const verses = [
  { verse: 1, chapter: 1, catagory: 'Intolerence', content: 'Forasmuch as many have taken in hand to set forth in order a declaration of those things which are most surely believed among us,', comment: "Zacharias and Elizabeth were both getting old, too old to have kids. But Zach prayed, so an angel appeared to tell him that God would take care of things for him. God would somehow get Liz pregnant and she'd have a son named John, who would be filled with the Holy Ghost from the moment God, the angel, the Holy Ghost, or Zach (or maybe all of them working together) got his mom pregnant.", bookId: 1},
  { verse: 2, chapter: 1, catagory: 'Violence', content: 'Even as they delivered them unto us, which from the beginning were eyewitnesses, and ministers of the word;', comment: 'There appeared unto him an angel of the Lord standing on the right side of the altar.', bookId: 1},
  { verse: 1, chapter: 2, catagory: 'Violence', content: 'For unto you is born this day in the city of David a Saviour, which is Christ the Lord.', comment: 'On earth peace, good will toward men.', bookId: 1}
];



const seed = async () => {
  await db.sync({force: true})

  // seed your database here!
  await Promise.all(users.map(user =>
    User.create(user)))

  await Promise.all(books.map(book =>
    Book.create(book)))

  // await Promise.all(chapters.map(chapter =>
  //   Chapter.create(chapter)))

  await Promise.all(verses.map(verse =>
    Verse.create(verse)))

  console.log('Seeding success!')
  db.close()
}

seed()
  .catch(err => {
    console.error('Oh noes! Something went wrong!')
    console.error(err)
    db.close()
  })
