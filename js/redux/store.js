import { createStore, applyMiddleware, compose }  from 'redux';
import reducer from './reducers';
// import actions from './actions';
import thunk from 'redux-thunk';
const store = applyMiddleware(thunk)(createStore)(reducer);

export default store;