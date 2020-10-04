import {createStore, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducers from './rootReducers'
import throttle from 'lodash.throttle'


const store = createStore(rootReducers, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

store.subscribe(throttle(() => {
    localStorage.setItem('favourites', JSON.stringify(store.getState().favItemReducer.favourites))
}), 2000)

export default store