import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import axios from 'axios';

// actions
const GOT_CHAPTER_VERSES = 'GOT_CHAPTER_VERSES';

// action creators
const gotVerses = (verses) => ({
  type: GOT_CHAPTER_VERSES,
  verses
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


// initial state
const initialState = {
  verses: []
}


// reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CHAPTER_VERSES:
      return {...state, verses: action.verses}
    default:
      return state;
  }
}

// create store
const store = createStore(reducer, applyMiddleware(thunkMiddleware, createLogger()))

export default store;
