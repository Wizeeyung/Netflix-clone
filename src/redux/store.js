import { configureStore } from '@reduxjs/toolkit'
import netflixReducer from './netflixSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

export const persistedReducer = persistReducer(persistConfig, netflixReducer)

export const store = configureStore({
  reducer: {netflix: persistedReducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})


export let persistor = persistStore(store)