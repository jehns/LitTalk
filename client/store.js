import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import axios from 'axios';

// actions
const GOT_CHAPTER_VERSES = 'GOT_CHAPTER_VERSES';
const GOT_USER = 'GOT_USER';
const SELECTED_VERSE = 'SELECTED_VERSE';

// action creators
const gotVerses = (verses) => ({
  type: GOT_CHAPTER_VERSES,
  verses
})
const gotUser = (user) => ({
  type: GOT_USER,
  user
})

export const selectVerse = (id) => ({
  type: SELECTED_VERSE,
  id
})

// thunks
export const getChapterVerses = (book, chapter) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/${book}/${chapter}`);
      const action = gotVerses(data);
      dispatch(action);
    }catch(err) {console.log(err)}
  }
}

export const getUser = () => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/${book}/${chapter}`);
      const action = gotVerses(data);
      dispatch(action);
    }catch(err) {console.log(err)}
  }
}


// initial state
const initialState = {
  verses: [],
  user: {},
  selectedVerse: null
}


// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CHAPTER_VERSES:
      return {...state, verses: action.verses}
    case SELECTED_VERSE:
      return {...state, selectedVerse: action.id}
    default:
      return state;
  }
}

// create store
const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))

export default store;
