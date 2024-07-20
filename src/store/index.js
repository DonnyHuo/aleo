import { legacy_createStore as createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducer";

// const persistConfig = {
//   key: "root",
//   storage: storage,
// };
// const myPersistReducer = persistReducer(persistConfig, reducer);

// const store = createStore(myPersistReducer);

// export const persistor = persistStore(store);


const store = createStore(reducer)

export default store;
