const router = require('express').Router()
const {db, Book, Chapter, User} = require('../db')


router.get('/', (req, res, next) => {
  res.send('you rock')
})

module.exports = router
