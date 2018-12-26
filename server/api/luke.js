const router = require('express').Router()
const {db, Book, Comment, Verse, User} = require('../db')


router.get('/:chapter', async (req, res, next) => {
  try {
    const verses = await Verse.findAll({
      where: {
        chapter: req.params.chapter
      },
      include: [{
        model: Comment
      }]
    })
    res.json(verses)
  } catch(err) {next(err)}
})

// router.get('/:chapter/:verse', async (req, res, next) => {
//   try {
//     const comments = await Comment.findAll({
//       include: [{
//         model: Verse,
//         where: {
//           chapter: req.params.chapter,
//           verse: req.params.verse
//         }
//         },
//       ]
//     })

//     res.json(comments)
//   } catch(err) {next(err)}
// })

module.exports = router
