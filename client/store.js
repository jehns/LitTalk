/* eslint-disable no-case-declarations */
/* eslint-disable complexity */
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import axios from 'axios';

// actions
const GOT_CHAPTER_VERSES = 'GOT_CHAPTER_VERSES';
const GOT_USER = 'GOT_USER';
const SELECTED_VERSE = 'SELECTED_VERSE';
const LOGGED_IN_USER = 'LOGGED_IN_USER';
const NEW_COMMENT = 'NEW_COMMENT';
const DELETED_COMMENT = 'DELETED_COMMENT';
const EDITED_COMMENT = 'EDITED_COMMENT';
const EDITED_VOTES = 'EDITED_VOTES';


// action creators
const gotVerses = (verses) => ({
  type: GOT_CHAPTER_VERSES,
  verses
})

const gotUser = (user) => ({
  type: GOT_USER,
  user
})

const gotComment = (comment) => ({
  type: NEW_COMMENT,
  comment
})

const deletedComment = (commentId) => ({
  type: DELETED_COMMENT,
  commentId
})

const editedComment = (editedComment) => ({
  type: EDITED_COMMENT,
  editedComment
})

const editedVotes = (user, comment) => ({
  type: EDITED_VOTES,
  user,
  comment
})


export const selectVerse = (verse) => ({
  type: SELECTED_VERSE,
  verse
})

export const loggedInUser = (user) => ({
  type: LOGGED_IN_USER,
  user
})


// thunk creators
export const getChapterVerses = (book, chapter) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/${book}/${chapter}`);
      const action = gotVerses(data);
      dispatch(action);
    }catch(err) {console.log(err)}
  }
}

export const getUser = (user) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/auth/login`, user);
      const action = gotUser(data);
      dispatch(action);
    }catch(err) {console.log(err)}
  }
}

export const fetchUser = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/auth/me`);
      const action = gotUser(data);
      dispatch(action);
    }catch(err) {console.log(err)}
  }
}

export const postComment = (comment, book) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.post(`/api/${book}`, comment);
      const action = gotComment(data);
      dispatch(action);
    }catch(err) {console.log(err)}
  }
}

export const deleteComment = (book, commentId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.delete(`/api/${book}/${commentId}`);
      const action = deletedComment(data);
      dispatch(action);
    }catch(err) {console.log(err)}
  }
}

export const editComment = (book, commentId, newComment) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put(`/api/${book}/${commentId}`, {newComment});
      const action = editedComment(data);
      dispatch(action);
    }catch(err) {console.log(err)}
  }
}

export const editVotes = (book, commentId, userId, upOrDown) => {
  return async (dispatch) => {
    try {
      const newUserAndComment = await axios.put(`/api/${book}/votes/${commentId}`, {userId, upOrDown});
      const action = editedVotes(newUserAndComment.data.user, newUserAndComment.data.comment);
      dispatch(action);
    }catch(err) {console.log(err)}
  }
}


export const logout = () => {
  return async dispatch => {
    try {
      await axios.delete('/api/auth/logout')
      dispatch(gotUser({}))
    } catch(err) {console.log(err)}
  }
}

// initial state
// should i eager load comments with my initial get request for verses? Or make an axios req everytime a verse is selected?
const initialState = {
  verses: [],
  user: {},
  selectedVerse: {}
}


// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CHAPTER_VERSES:
      return {...state, verses: action.verses}
    case GOT_USER:
      return {...state, user: action.user}
    case SELECTED_VERSE:
      return {...state, selectedVerse: action.verse}
    case LOGGED_IN_USER:
      return {...state, user: action.user}
    case NEW_COMMENT:
      return {...state, selectedVerse: {...state.selectedVerse, comments: [...state.selectedVerse.comments, action.comment]}}
    case DELETED_COMMENT:
      const filteredComments = [...state.selectedVerse.comments].filter(comment => {
        return comment.id !== Number(action.commentId)
      })
      return {...state, selectedVerse: {...state.selectedVerse, comments: filteredComments}}
    case EDITED_COMMENT:
      const editedComments = [...state.selectedVerse.comments].map(comment => {
        if (comment.id === action.editedComment.id) {
          comment.content = action.editedComment.content
        }
        return comment
      })
    return {...state, selectedVerse: {...state.selectedVerse, comments: editedComments}}
    case EDITED_VOTES:
    const editedVotes = [...state.selectedVerse.comments].map(comment => {
      if (comment.id === action.comment.id) {
        comment.votes = action.comment.votes
      }
      return comment
    })
    return {...state, selectedVerse: {...state.selectedVerse, comments: editedVotes}, user: action.user}
    default:
      return state;
  }
}

// create store
const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))

export default store;
