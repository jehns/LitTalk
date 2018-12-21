const {db, Book, Chapter, Verse, User} = require('./server/db')
const {green, red} = require('chalk')
const image = 'https://mobileimages.lowes.com/product/converted/043033/043033570362.jpg'

const User = [
  {},

];

const students = [
  { firstName: 'Unhappy', lastName: 'Gilmore', email: 'somthing1@gmail.com', imageUrl: image, gpa: 3.8, campusId: 1 },
  { firstName: 'Luck', lastName: 'Loco', email: 'somthing9@gmail.com', imageUrl: image, gpa: 2.2, campusId: 1 },
  { firstName: 'Heavy', lastName: 'Lamb', email: 'somthing44@gmail.com', imageUrl: image, gpa: 2.2, campusId: 1 },
  { firstName: 'Tim', lastName: 'Jorjoe', email: 'somthing3@gmail.com', imageUrl: image, gpa: 1.1, campusId: 2},
  { firstName: 'Sandman', lastName: 'Ono', email: 'somthing88@gmail.com', imageUrl: image, gpa: 3.2, campusId: 2 },
  { firstName: 'Sanjeev', lastName: 'Sharma', email: 'somthing221@gmail.com', imageUrl: image, gpa: 3.2, campusId: 3 },
  { firstName: 'Stu', lastName: 'Boss', email: 'somthing12@gmail.com', imageUrl: image, gpa: 3.9, campusId: 3 },
  { firstName: 'Mandy', lastName: 'May', email: 'somthing678@gmail.com', imageUrl: image, gpa: 1.8, campusId: 3 },
  { firstName: 'Cruise', lastName: 'Tommy', email: 'somthing55@gmail.com', imageUrl: image, gpa: 3.1, campusId: 4 },
  { firstName: 'Jake', lastName: 'Snake', email: 'somthing100@gmail.com', imageUrl: image, gpa: 3.5, campusId: 4 },
];


const seed = async () => {
  await db.sync({force: true})

  // seed your database here!
  await Promise.all(campuses.map(campus =>
    Campuses.create(campus)))

  await Promise.all(students.map(student =>
    Students.create(student)))

  console.log(green('Seeding success!'))
  db.close()
}

seed()
  .catch(err => {
    console.error(red('Oh noes! Something went wrong!'))
    console.error(err)
    db.close()
  })
