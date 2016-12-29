import { createStore, applyMiddleware, compose }  from 'redux';
var reducer = require('./reducers');
var actions = require('./actions');
var thunk = require('redux-thunk').default;

var store = createStore(reducer, compose( applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension() : f => f ));

module.exports  = store;