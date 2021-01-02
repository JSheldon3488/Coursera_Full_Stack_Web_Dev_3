import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './dishesReducer';
import { comments } from './commentsReducer';
import { promotions } from './promotionsReducer';
import { leaders } from './leadersReducer';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes,
            comments,
            promotions,
            leaders
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}