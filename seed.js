const {db, Book, Verse, User, Comment} = require('./server/db')

const users = [
  {name: 'Stuart', email: 'sj@gmail.com', password: '123', biography: "I love the Mcdonald's french fry."},
  {name: 'Phil', email: 'pw@gmail.com', password: '123', biography: "Hello I am from New Found Land and have a bunch of cool rocks to share with the class. Tom Cruise is my best friend except for when he screws me over.", imageUrl: 'https://image.flaticon.com/icons/svg/145/145859.svg'},
  {name: 'Brendan', email: 'bl@gmail.com', password: '123', biography: "One day I will cross the sea and make friends with all the Corgis.", imageUrl: 'https://image.flaticon.com/icons/png/512/145/145855.png'},
  {name: 'Heather', email: 'hs@gmail.com', password: '123', biography: "Hi, Im Heather - add me on Facebook!", imageUrl: 'https://image.flaticon.com/icons/svg/145/145864.svg'},
];

const books = [
  { name: 'Dune' }
];

const verses = [
  { verse: 1, chapter: 1, catagory: 'Intolerence', content: "In the week before their departure to Arrakis, when all the final scurrying about had reached a nearly unbearable frenzy, an old crone came to visit the mother of the boy, Paul.", annotation: "These semiscientific, semireligious phrases are puzzling, and since they are never really explained, it is difficult to understand the difference between the author’s definitions of scurrying and unbearable. Arrakis remains the central theme.", bookId: 1},
  { verse: 2, chapter: 1, catagory: 'Violence', content: 'It was a warm night at Castle Caladan, and the ancient pile of stone that had served the Atreides family as home for twenty-six generations bore that cooled-sweat feeling it acquired before a change in the weather.', annotation: "Within the first few pages, Dune buries us in an avalanche of names—people, places, things, and concepts. Many of these new terms are explained, but many are not. We are forced either to wait until they are explained or try to figure things out using context clues.", bookId: 1},
  { verse: 3, chapter: 1, catagory: 'Violence', content: "The old woman was let in by the side door down the vaulted passage by Paul's room and she was allowed a moment to peer in at him where he lay in his bed.", annotation: "Now this man purchased a field... and falling headlong, he burst asunder... and all his bowels gushed out.", bookId: 1},
  { verse: 4, chapter: 1, catagory: 'Violence', content: "Thufir Hawat, his father's Master of Assassins, had explained it: their mortal enemies, the Harkonnens, had been on Arrakis eighty years, holding the planet in quasi-fief under a CHOAM Company contract to mine the geriatric spice, melange. Now the Harkonnens were leaving to be replaced by the House of Atreides in fief-complete — an apparent victory for the Duke Leto. Yet, Hawat had said, this appearance contained the deadliest peril, for the Duke Lewas popular among the Great Houses of the Landsraad. ", annotation: 'Paul’s success with the test and his resistance to a great amount of pain make him seem even older. One idea that is not fully explored in Dune is the reverend mother’s suggestion that Paul may be an animal instead of a human being. Prior to the test, Paul recites to himself a kind of mantra that partially explains the differences between animals and human beings: “Animal pleasures remain close to sensation levels and avoid the perceptual . . . the human requires a background grid through which to see the universe.” ',bookId: 1},
  { verse: 1, chapter: 2, catagory: 'Violence', content: "By the half-light of a suspensor lamp, dimmed and hanging near the floor, the awakened boy could see a bulky female shape at his door, standing one step ahead of his mother. The old woman was a witch shadow — hair like matted spiderwebs, hooded 'round darkness of features, eyes like glittering jewels.", annotation: 'One idea that is not fully explored in Dune is the reverend mother’s suggestion that Paul may be an animal instead of a human being. Prior to the test, Paul recites to himself a kind of mantra that partially explains the differences between animals and human beings', bookId: 1},
  { verse: 2, chapter: 2, catagory: 'Intolerence', content: 'And it was known unto all the dwellers at Jerusalem; insomuch as that field is called in their proper tongue, Aceldama, that is to say, The field of blood.', annotation: "The novel immediately introduces us to Paul Atreides, who is the novel’s main character. Although Paul is fifteen years old when the story begins, he never seems to act like a child or even a teenager. When the reverend mother tests him, he shows some mild arrogance and petulance, but no more than any adult undergoing such a test would.", bookId: 1}
];

const comments = [
  {content: "How does Reverend Mother Mohaim test whether Paul is a human?", votes: 3, userId: 1, verseId: 1,},
  {content: "Neo wouldn't talk if zion was under attack.", votes: 3, userId: 2, verseId: 1,},
  {content: "Morpheus was the one.", votes: 1, userId: 4, verseId: 1,},
  {content: "What does a Mentat use in their thinking process?", votes: 4, userId: 1, verseId: 2, },
  {content: "Where does Paul meet Usul?", votes: 7, userId: 2, verseId: 2, },
  {content: "In no time ill be no time!",votes: 0, userId: 4, verseId: 2,},
  {content: "What does the Kwisatz Haderach bring?", votes: 2, userId: 3, verseId: 3,},
  {content: "What did the baron convince the emperor to give?", votes: 1, userId: 3, verseId: 4,},
  {content: "You're right", votes: 3, userId: 1, verseId: 4,},
  {content: "I'm batman.", votes: 0, userId: 1, verseId: 4,},
  {content: "Time is infinite. Sometimes.", votes: 2, userId: 3, verseId: 5,},
  {content: "Spiderman bites people who look like him!", votes: 1, userId: 2, verseId: 5,},
  {content: "Woah! Dude so cray.", votes: 2, userId: 2, verseId: 6,}
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
