/* eslint-disable max-statements */
const router = require('express').Router()
const {db, Book, Comment, Verse, User} = require('../db')


// Comment Voting
router.put('/votes/:commentId', async (req, res, next) => {
  const commentId = Number(req.params.commentId);
  try {
    let updatedUpVotes;
    let updatedVoteCount;
    // logged-in user
    const currentUser = await User.findByPk(req.body.userId);
    const currentComment = await Comment.findByPk(commentId);

    // Request is an up-vote if true
    if (req.body.upOrDown) {
      // User has already up-voted the comment
      if (currentUser.upVotes.includes(commentId)) {
        updatedUpVotes = currentUser.upVotes.slice().filter(id => {
          return id !== commentId;
        })

        updatedVoteCount = currentComment.votes - 1;

        // update User upvotes
        let [numberOfAffectedRowsUser, affectedRowsUser] = await User.update({
          upVotes: updatedUpVotes
        }, {
          where: {
            id: req.body.userId
          },
          returning: true,
          plain: true
        })

        // update Comment vote count
        let [numberOfAffectedRowsComment, affectedRowsComment] = await Comment.update({
          votes: updatedVoteCount,
          }, {
            where: {
              id: commentId
            },
          returning: true,
          plain: true
        })
        res.json({affectedRowsUser, affectedRowsComment})
      }

      // User has not upvoted the comment yet
      else {

        updatedUpVotes = currentUser.upVotes.slice()
        updatedUpVotes.push(commentId)

        updatedVoteCount = currentComment.votes + 1;

        // update User upvotes
        let [numberOfAffectedRowsUser, affectedRowsUser] = await User.update({
          upVotes: updatedUpVotes
        }, {
          where: {
            id: req.body.userId
          },
          returning: true,
          plain: true
        })

        // update Comment vote count
        let [numberOfAffectedRowsComment, affectedRowsComment] = await Comment.update({
          votes: updatedVoteCount,
          }, {
            where: {
              id: commentId
            },
          returning: true,
          plain: true
        })
        res.json({affectedRowsUser, affectedRowsComment})
      }

    }



    // Down-Vote request
    else {
        // User has already down-voted the comment
        if (currentUser.downVotes.includes(commentId)) {
          updatedUpVotes = currentUser.downVotes.slice().filter(id => {
            return id !== commentId;
          })

          updatedVoteCount = currentComment.votes + 1;



          // update User upvotes
          let [numberOfAffectedRowsUser, affectedRowsUser] = await User.update({
            downVotes: updatedUpVotes
          }, {
            where: {
              id: req.body.userId
            },
            returning: true,
            plain: true
          })

          // update Comment vote count
          let [numberOfAffectedRowsComment, affectedRowsComment] = await Comment.update({
            votes: updatedVoteCount,
            }, {
              where: {
                id: commentId
              },
            returning: true,
            plain: true
          })
          res.json({affectedRowsUser, affectedRowsComment})
        }

        // User has not downvoted the comment yet
        else {

          updatedUpVotes = currentUser.downVotes.slice()
          updatedUpVotes.push(commentId)

          updatedVoteCount = currentComment.votes - 1;

          // update User upvotes
          let [numberOfAffectedRowsUser, affectedRowsUser] = await User.update({
            downVotes: updatedUpVotes
          }, {
            where: {
              id: req.body.userId
            },
            returning: true,
            plain: true
          })

          // update Comment vote count
          let [numberOfAffectedRowsComment, affectedRowsComment] = await Comment.update({
            votes: updatedVoteCount,
            }, {
              where: {
                id: commentId
              },
            returning: true,
            plain: true
          })
          res.json({affectedRowsUser, affectedRowsComment})
        }

    }

  } catch(err) {next(err)}
})


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


router.put('/:commentId', async (req, res, next) => {
  try {
    const [numberOfAffectedRows, affectedRows] = await Comment.update({

      content: req.body.newComment,
      }, {
        where: {
          id: req.params.commentId
        },
      returning: true,
      plain: true

    })

    const returnComment = await Comment.findOne({
      where: {
        id: affectedRows.id
      },
      include: [
        {model: User},
        {model: Verse}
      ]
    })
    res.json(returnComment)
  } catch(err) {next(err)}
})

router.delete('/:commentId', async (req, res, next) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.commentId
      }
    })
    if (deletedComment === 1) {
      res.json(req.params.commentId)
    } else {
      res.sendStatus(409)
    }
  } catch(err) {next(err)}
})


module.exports = router
