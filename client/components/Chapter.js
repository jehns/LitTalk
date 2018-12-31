import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { getChapterVerses, selectVerse, postComment, deleteComment } from '../store';
import { Grid, Typography, FormGroup, Input, InputLabel, Button, DialogContentText, Avatar, IconButton, Icon } from '@material-ui/core';
import { Cancel, Edit } from '@material-ui/icons';
import Footer from './Footer';



class Chapter extends Component {
  constructor() {
    super()
    this.state = {
      newComment: '',
      showCommentsButton: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClickButton = this.handleClickButton.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleCommentsButton = this.handleCommentsButton.bind(this)
    this.handleChangeFooter = this.handleChangeFooter.bind(this)
    this.handleDeleteCommentButton = this.handleDeleteCommentButton.bind(this)
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
            {this.props.verses.map((verse) => {
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

            {this.props.selectedVerse.comments.map(comment => {
              return (

              <div key={comment.id}>
              <Grid container alignItems="center" spacing={24} direction="row">
                <Grid item md>
                  <Grid container direction="row" alignItems="center">
                  <Avatar src={`${comment.user.imageUrl}`}/>
                  <Typography variant="h5">{comment.user.name}</Typography>
                  </Grid>
                </Grid>
                {comment.user.id === this.props.user.id ?
                <Grid item md>
                  <Grid container alignItems="center" justify="flex-end">
                    <IconButton onClick={() => this.handleDeleteCommentButton(comment.id)}>
                      <Cancel />
                    </IconButton>
                    <IconButton>
                      <Edit />
                    </IconButton>
                  </Grid>
                </Grid>
                : ""}

              </Grid>

                <Grid container>
                  <Typography variant="body1">{comment.content}</Typography>
                </Grid>

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
    deleteComment: (book, commentId) => dispatch(deleteComment(book, commentId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chapter))
