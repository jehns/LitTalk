import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { getChapterVerses, selectVerse, postComment, deleteComment, editComment, editVotes } from '../store';
import { Grid, Typography, FormGroup, Input, InputLabel, Button, DialogContentText, Avatar, IconButton, Icon } from '@material-ui/core';
import { Cancel, Edit, ArrowUpward, ArrowDownward } from '@material-ui/icons';
import Footer from './Footer';
import { withTheme } from '@material-ui/core/styles';



class Chapter extends Component {
  constructor() {
    super()
    this.state = {
      newComment: '',
      editCommentInput: '',
      renderCommentEditor: false,
      showCommentsButton: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClickButton = this.handleClickButton.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCommentsButton = this.handleCommentsButton.bind(this)
    this.handleChangeFooter = this.handleChangeFooter.bind(this)
    this.handleDeleteCommentButton = this.handleDeleteCommentButton.bind(this)
    this.handleEditCommentButton = this.handleEditCommentButton.bind(this)
    this.handleClickEditComment = this.handleClickEditComment.bind(this)
    this.upVoteClick = this.upVoteClick.bind(this)
    this.downVoteClick = this.downVoteClick.bind(this)
  }

  async componentDidMount () {
    await this.props.getChapterVerses(this.props.match.params.book, this.props.match.params.chapter)

    if ((this.props.match.params.verse && !this.props.selectedVerse.verse) || (this.props.match.params.verse && this.props.selectedVerse.verse && this.props.match.params.verse !== this.props.selectedVerse.verse)) {
      const verseSelect = this.props.verses.find(verse => {
        return verse.verse === Number(this.props.match.params.verse)
      })
      this.props.selectVerse(verseSelect)
    } else {
      this.props.selectVerse({});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.chapter !== prevProps.match.params.chapter) {
      this.props.getChapterVerses(this.props.match.params.book, this.props.match.params.chapter)
    }
  }

  handleClick(verse) {
    this.props.selectVerse(verse);
    this.props.history.push(`/${this.props.match.params.book}/${this.props.match.params.chapter}/${verse.verse}`)
  }

  handleClickButton(e) {
    e.preventDefault()
    this.props.postComment({
      content: this.state.newComment,
      userId: this.props.user.id,
      verseId: this.props.selectedVerse.id
    }, this.props.match.params.book)
    this.setState({
      newComment: ''
    })
  }

  handleCommentsButton() {
    this.setState({
      showCommentsButton: !this.state.showCommentsButton
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleChangeFooter(e, value) {
    if (value === 'home') {
      this.props.history.push('/')
    } else if (value === 'last') {
      this.props.history.push(`/${this.props.match.params.book}/${Number(this.props.match.params.chapter) - 1}`)
    } else if (value === 'next') {
      this.props.history.push(`/${this.props.match.params.book}/${Number(this.props.match.params.chapter) + 1}`)
    }
  }

  handleDeleteCommentButton(commentId) {
    this.props.deleteComment(this.props.match.params.book, commentId)
  }

  handleEditCommentButton(commentContent) {
    this.setState({
      renderCommentEditor: !this.state.renderCommentEditor,
      editCommentInput: commentContent
    })
  }

  handleClickEditComment(commentId) {
    this.props.editComment(this.props.match.params.book, commentId, this.state.editCommentInput)
    this.setState({
      renderCommentEditor: false,
      editComment: ""
    })
  }

  upVoteClick(commentId) {
    const up = true;
    this.props.editVotes(this.props.match.params.book, commentId, this.props.user.id, up)
  }

  downVoteClick(commentId) {
    const up = false;
    this.props.editVotes(this.props.match.params.book, commentId, this.props.user.id, up)
  }

  render() {
    return (
      <div>
      <Grid container>

        <Grid container>
          <Typography variant="h1">
              {this.props.match.params.book.slice(0,1).toUpperCase() + this.props.match.params.book.slice(1)}
          </Typography>
        </Grid>

        <Grid item sm style={{padding: 20}}>
          {this.props.verses ?
          <div>
            <Typography variant="h5">Chapter {this.props.match.params.chapter}</Typography>
            {this.props.verses.sort((a, b) => {
              return a.verse - b.verse;
            }).map((verse) => {
              return <p key={verse.id} onClick={() => this.handleClick(verse)} className={this.props.selectedVerse && this.props.selectedVerse.id === verse.id ? "orange box" : "box"}>{verse.content}</p>
            })}
          </div>
          : <div>Something went wrong...</div>}
        </Grid>



        <Grid item sm style={{padding: 20}}>
          <Typography variant="h5" style={{textDecoration: 'underline'}}>Annotation</Typography>
          {this.props.selectedVerse && this.props.selectedVerse.id ?
          <div>
            <br />
            <Typography variant="body2">{this.props.selectedVerse.annotation}</Typography>
            <br />
            <br />

            <Button onClick={this.handleCommentsButton} fullWidth={true} size='large'>Comments</Button>
            {this.state.showCommentsButton ?
            <div>
            <br />

            {this.props.selectedVerse.comments.sort((a, b) => {
              return b.votes - a.votes;
            }).map(comment => {
              return (

              <div key={comment.id}>

              <Grid container alignItems="center" spacing={24} direction="row">
                <Grid item md>
                  <Grid container direction="row" alignItems="center">
                  <Grid item>
                    {comment.user.id === this.props.user.id || !this.props.user.id ?
                      "" :
                      <Grid container direction="column" alignItems="center">
                      <IconButton style={{padding: 0}} color={this.props.user.upVotes.includes(comment.id) ? "primary" : "default"} onClick={() => this.upVoteClick(comment.id, comment.votes)}>
                        <ArrowUpward />
                      </IconButton>
                      <IconButton style={{padding: 0}} color={this.props.user.downVotes.includes(comment.id) ? "primary" : "default"}  onClick={() => this.downVoteClick(comment.id, comment.votes)}>
                        <ArrowDownward />
                      </IconButton>
                    </Grid>
                    }
                  </Grid>

                  <Grid item style={{padding: 1}}>
                    <Avatar src={`${comment.user.imageUrl}`}/>
                  </Grid>

                  <Grid item style={{padding: 1}}>
                    <Typography variant="h5">{comment.user.name}</Typography>
                  </Grid>

                  <Grid item style={{padding: 5}}>
                    <Typography variant="caption" className="italics">Votes {comment.votes}</Typography>
                  </Grid>

                  </Grid>
                </Grid>

                {comment.user.id === this.props.user.id ?
                <Grid item md>
                  <Grid container alignItems="center" justify="flex-end">
                    <IconButton onClick={() => this.handleDeleteCommentButton(comment.id)}>
                      <Cancel />
                    </IconButton>
                    <IconButton onClick={() => this.handleEditCommentButton(comment.content)}>
                      <Edit />
                    </IconButton>
                  </Grid>
                </Grid>
                : ""}

              </Grid>

                {this.state.renderCommentEditor && comment.user.id === this.props.user.id?
                  <FormGroup>
                    <Input name="editCommentInput" type="text" onChange={this.handleChange} value={this.state.editCommentInput}/>
                    <Button onClick={() => this.handleClickEditComment(comment.id)}>Save Comment Edits</Button>
                  </FormGroup>
                  :
                  <Grid container>
                    <Typography variant="body1">{comment.content}</Typography>
                  </Grid>
                }

                <Grid container>
                  <Typography variant="caption" className="italics">{comment.date}</Typography>
                </Grid>
                <br />
              </div>
              )
            })}

            <br />
            {this.props.user.id ?
            <FormGroup>
              <Input name="newComment" type="text" onChange={this.handleChange} value={this.state.newComment}/>
              <Button onClick={this.handleClickButton}>Post Comment</Button>
            </FormGroup>
            :
            ""
            }
            </div>
            : ""}
          </div>
          :
          ""
          }

        </Grid>

      </Grid>
      <Footer onChange={this.handleChangeFooter}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    verses: state.verses,
    selectedVerse: state.selectedVerse,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getChapterVerses: (book, chapter) => dispatch(getChapterVerses(book, chapter)),
    selectVerse: (verse) => dispatch(selectVerse(verse)),
    postComment: (comment, book) => dispatch(postComment(comment, book)),
    deleteComment: (book, commentId) => dispatch(deleteComment(book, commentId)),
    editComment: (book, commentId, newComment) => dispatch(editComment(book, commentId, newComment)),
    editVotes: (book, commentId, userId, upOrDown) => dispatch(editVotes(book, commentId, userId, upOrDown))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withTheme()(Chapter)))
