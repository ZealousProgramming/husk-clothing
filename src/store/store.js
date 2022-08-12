import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { rootReducer } from "./root-reducer";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["cart"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
	process.env.NODE_ENV === "development" && logger,
	thunk,
].filter(Boolean);

const composedEnhancers = compose(applyMiddleware(...middlewares));

// root-reducer
export const store = createStore(persistedReducer, composedEnhancers);

export const persistor = persistStore(store);
