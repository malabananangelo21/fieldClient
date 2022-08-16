// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { Provider } from "react-redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './components/apps/combineReducer/combineReducer'
import { createMigrate, persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const migrations = {
    0: (state) => {
        return {
         ...state,
        }
    }
};

const persistConfig = {
    key: 'primary',
    version: 0,
    storage,
    debug: true,  
    stateReconciler: false, 
    migrate: createMigrate(migrations, { debug: true }),
};

const finalReducer = persistReducer(persistConfig, rootReducer);





// const persistConfig ={
//     key:'root',
//     storage
// }
// const persistedReducer = persistReducer(persistConfig,rootReducer)

const devTools =
    process.env.NODE_ENV === "production"
        ? applyMiddleware(thunk)
        : composeWithDevTools(applyMiddleware(thunk));
const store = createStore(
    finalReducer,
    devTools,

);
const persistore = persistStore(store);


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistore}>
            <App />
        </PersistGate>
    </Provider>
    , document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
