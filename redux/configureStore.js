import {createStore, applyMiddleware} from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './dishesReducer';
import { comments } from './commentsReducer';
import { promotions } from './promotionsReducer';
import { leaders } from './leadersReducer';
import { favorites } from './favoritesReducer';


const config = {
    key: 'root',
    storage,
    debug: true
}


export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {
            dishes,
            comments,
            promotions,
            leaders,
            favorites
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store)

    return { persistor, store };
}