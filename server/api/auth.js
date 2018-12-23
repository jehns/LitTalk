const router = require('express').Router()
const {db, Book, Chapter, Verse, User} = require('../db')

router.get('/me', async (req, res, next) => {
  try {
    if (!req.session.userId) {
      res.sendStatus(401)
    } else {
      const user = await User.findById(req.session.userId)
      if (!user) {
        res.sendStatus(401)
      } else {
        res.json(user)
      }
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/logout', (req, res) => {
  // remove user id from session
  delete req.session.userId;
  res.sendStatus(204)
})

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
