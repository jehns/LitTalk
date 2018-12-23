const router = require('express').Router()
const {db, Book, Chapter, Verse, User} = require('../db')


router.put('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
        password: req.body.password
      }
    })
    if (!user) {
      res.sendStatus(401)
    } else {
      req.session.userId = user.id
      res.json(user)
    }
  } catch(err) {next(err)}
})

module.exports = router
