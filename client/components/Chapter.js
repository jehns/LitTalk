import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { getChapterVerses, selectVerse, postComment } from '../store';
import { Grid, Typography, FormGroup, Input, InputLabel, Button } from '@material-ui/core';


class Chapter extends Component {
  constructor() {
    super()
    this.state = {
      newComment: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleClickButton = this.handleClickButton.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount () {
    await this.props.getChapterVerses(this.props.match.params.book, this.props.match.params.chapter)

    console.log(this.props.match.params.verse, this.props.selectedVerse.verse, this.props.verses)

    if ((this.props.match.params.verse && !this.props.selectedVerse.verse) || (this.props.match.params.verse && this.props.selectedVerse.verse && this.props.match.params.verse !== this.props.selectedVerse.verse)) {
      const verseSelect = this.props.verses.find(verse => {
        return verse.verse === Number(this.props.match.params.verse)
      })
      this.props.selectVerse(verseSelect)
    } else {
      this.props.selectVerse({});
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
    }, this.props.match.params.book, this.props.selectedVerse.chapter, this.props.selectedVerse.verse)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <Grid container>

        <Grid container>
          <Typography variant="h1">
              {this.props.match.params.book.slice(0,1).toUpperCase() + this.props.match.params.book.slice(1)}
          </Typography>
        </Grid>

        <Grid item sm style={{padding: 20}}>
          {this.props.verses ?
          <div>
            {this.props.verses.map((verse) => {
              return <p key={verse.id} onClick={() => this.handleClick(verse)} className={this.props.selectedVerse && this.props.selectedVerse.id === verse.id ? "orange" : ""}>{verse.content}</p>
            })}
          </div>
          : <div>Something went wrong...</div>}
        </Grid>

        <Grid item sm style={{padding: 20}}>
          {this.props.selectedVerse && this.props.selectedVerse.id ?
          <div>
            <Typography variant="h5" style={{textDecoration: 'underline'}}>Annotation</Typography>
            <br />
            <Typography variant="body2">{this.props.selectedVerse.annotation}</Typography>
            <br />
            <br />
            <Typography variant="h5" style={{textDecoration: 'underline'}}>Comments</Typography>
            <br />
            {this.props.selectedVerse.comments.map(comment => {
              return (
              <div key={comment.id}>
                <Typography variant="h6">{comment.user.name}</Typography>
                <Typography>{comment.content}</Typography>
                <Typography>{comment.date}</Typography>

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
          :
          ""
          }
        </Grid>
      </Grid>
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
    postComment: (comment, book, chapter, verse) => dispatch(postComment(comment))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chapter))
