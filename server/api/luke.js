const router = require('express').Router()
const {db, Book, Comment, Verse, User} = require('../db')


router.get('/:chapter', async (req, res, next) => {
  try {
    const verses = await Verse.findAll({
      where: {
        chapter: req.params.chapter
      },
      include: [{
        model: Comment,
        include: [{
          model: User
        }]
      }]
    })
    res.json(verses)
  } catch(err) {next(err)}
})

router.post('/', async (req, res, next) => {
  try {
    const comment = await Comment.create(req.body)
    const returnComment = await Comment.findOne({
      where: {
        id: comment.id
      },
      include: [
        {model: User},
        {model: Verse}
      ]
    })
    res.json(returnComment)
  } catch(err) {next(err)}
})


module.exports = router
