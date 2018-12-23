import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import { getChapterVerses, selectVerse } from '../store';
import { Grid, Typography } from '@material-ui/core';


class Chapter extends Component {
  constructor() {
    super()
    this.state = {
      comment: ''
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount () {
    this.props.getChapterVerses(this.props.match.params.book, 1)
  }

  handleClick(verse) {
    this.props.selectVerse(verse.id);
    this.setState({
      comment: verse.comment
    })
  }

  render() {
    return (
      <Grid container>
        <Grid container>
          <Typography variant="h1">
              {this.props.match.params.book}
          </Typography>
        </Grid>

        <Grid item sm style={{padding: 20}}>
          {this.props.verses ?
          <div>
            {this.props.verses.map((verse) => {
              return <p key={verse.id} onClick={() => this.handleClick(verse)} className={this.props.selectedVerse === verse.id ? "orange" : ""}>{verse.content}</p>
            })}
          </div>

          : <div>Something went wrong...</div>}
        </Grid>
        <Grid item sm style={{padding: 20}}>
          {this.state.comment}
        </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    verses: state.verses,
    selectedVerse: state.selectedVerse
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getChapterVerses: (book, chapter) => dispatch(getChapterVerses(book, chapter)),
    selectVerse: (id) => dispatch(selectVerse(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chapter))
