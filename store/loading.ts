import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initState:LoadingState = {
  loadingMessages: false,
  loadingThreads: false,
  isLoading: false
}

export const { actions, ...loadingSlice } = createSlice({
  name: 'loading',
  initialState: initState,
  reducers: {
    isLoading (
      state,
      { payload }:PayloadAction<boolean>
    ):LoadingState {
      return {...state,isLoading:payload}
    },
    loadingMessages (
      state,
      {payload}:PayloadAction<boolean>
    ):LoadingState {
      return {...state,loadingMessages:payload}
    },
    loadingThreads (
      state,
      {payload}:PayloadAction<boolean>
    ):LoadingState {
      return {...state, loadingThreads: payload}
    },
  }
})

export const loadingActions = {
  ...actions
}

export interface LoadingState {
  isLoading:boolean,
  loadingMessages:boolean,
  loadingThreads:boolean
}