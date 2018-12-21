const router = require('express').Router()
const {db, Book, Chapter, Verse, User} = require('../db')


router.get('/:chapter', async (req, res, next) => {
  try {
    const verses = await Verse.findAll({
      where: {
        chapter: req.params.chapter
      }
    })
    res.json(verses)
  } catch(err) {next(err)}
})

module.exports = router
