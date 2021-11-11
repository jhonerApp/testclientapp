import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { reducers } from '../store/index'

import Pagereducer from './Reducer/Menu/Pagereducer';

const Store = createStore(
    reducers,
    compose(applyMiddleware(thunk))
)

export default Store