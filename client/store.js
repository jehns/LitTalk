import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import axios from 'axios';

// actions
const GOT_CHAPTER_VERSES = 'GOT_CHAPTER_VERSES';
const GOT_USER = 'GOT_USER';
const SELECTED_VERSE = 'SELECTED_VERSE';
const LOGGED_IN_USER = 'LOGGED_IN_USER';

// action creators
const gotVerses = (verses) => ({
  type: GOT_CHAPTER_VERSES,
  verses
})
const gotUser = (user) => ({
  type: GOT_USER,
  user
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

export const logout = () => {
  return async dispatch => {
    try {
      await axios.delete('/api/auth/logout')
      dispatch(gotUser({}))
    } catch(err) {console.log(err)}
  }
}

// export const getVerseComments = (book, chapter, verse) => {
//   return async (dispatch) => {
//     try {
//       const {data} = await axios.get(`/api/${book}/${chapter}/${verse}`);
//       const action = gotVerseComments(data);
//       dispatch(action);
//     }catch(err) {console.log(err)}
//   }
// }

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
    default:
      return state;
  }
}

// create store
const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))

export default store;
