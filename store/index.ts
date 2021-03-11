/* eslint-disable no-unused-vars */
import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import {
  useSelector as nativeUseSelector,
  TypedUseSelectorHook
} from 'react-redux'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import { AsyncStorage } from 'react-native'
import { userSlice } from './user'
import { threadsSlice } from './threads'
import { loadingSlice } from './loading'

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [threadsSlice.name]: threadsSlice.reducer,
  [loadingSlice.name]: loadingSlice.reducer
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  timeout: 10000
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false
  })
})

export const persistor = persistStore(store)

export type AppState = ReturnType<typeof rootReducer>;

export const useSelector: TypedUseSelectorHook<AppState> = nativeUseSelector
