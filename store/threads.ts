import { createSlice, PayloadAction, ThunkAction, Action } from '@reduxjs/toolkit';
import ThreadService, { Thread, Message, ThreadResponse } from '../services/threadService';
import { Users, User } from '../services/userService';
import { AppState } from '.';
import { loadingActions } from './loading';
import MessageService from '../services/messageService';
import { Messages } from './message';

const initState:Threads = []

export const { actions, ...threadsSlice } = createSlice({
  name: 'threads',
  initialState: initState,
  reducers: {
    getThreads(
      state,
      { payload }: PayloadAction<Threads>,
    ) {      
      return payload
    },
    createThread(
      state,
      {payload} : PayloadAction<Thread>
    ):Threads {
      return [ payload,...state ]
    },
    clearThreads():Threads {
      return initState
    },
    updateThread(
      state,
      {payload}:PayloadAction<ThreadResponse>
    ):Threads {
      const threads = state.map(thread=>{
        if(thread.id == payload.id){
          return {...thread,messages: thread.messages}
        }
        return thread
      })
      return threads
    },
    getMessages(
      state,
      {payload}:PayloadAction<Threads>
    ): Threads {
      return payload
    },
    updateMessages(
      state,
      {payload}:PayloadAction<ThreadMessages>
    ): Threads {
      const updatedThreads = state.map(thread=>{
        if(thread.id === payload.id){
          return {...thread,messages:payload.messages}
        }
        return thread
      })
      return updatedThreads
    },
    addMessage(
      state,
      {payload}:PayloadAction<Thread>
    ): Threads {
      return [payload]
    },
    clearMessages(
      state,
      {payload}:PayloadAction<string>
    ): Threads {
      return state.map(thread => {
        if(thread.id === payload){
          return {...thread, messages: []}
        }
        return thread
      })
    }
  },
})
/**
 * 
 * @param id user id
 */
const getThreads = (id:string) => async (dispatch:any,getState:()=>AppState) => {
  dispatch(loadingActions.loadingThreads(true))
  const data = await ThreadService.getThreads(id)
  data && dispatch(actions.getThreads(data))
  dispatch(loadingActions.loadingThreads(false))
}
/**
 * 
 * @param id user id
 * @param pid participant id
 */
const createThread = (id:string,pid:string) => async (dispatch:any) => {
  const data = await ThreadService.createThread(id,pid)
  data && dispatch(actions.createThread(data))
}

/**
 * 
 * @param id thread id
 */
const getMessages = (id:string) => async (dispatch:any,getState:()=>AppState) => {
  dispatch(loadingActions.loadingMessages(true))
  const {user:{id:userId},threads} = getState()
  const data = (userId && await MessageService.getMessages(id,userId)) || []
  const updatedThreads = threads.map(thread=>{
    if(thread.id === id){
      return {...thread, messages:data}
    }
    return thread
  })
  updatedThreads && dispatch(actions.getMessages(updatedThreads))
  dispatch(loadingActions.isLoading(false))
  dispatch(loadingActions.loadingMessages(false))
}

/**
 * 
 * @param id thread id
 * @param message message data
 * @param uid user id
 */
const sendMessage = (id:string,message:Message,uid:string) => async (dispatch:any,getState:()=>AppState) => {
  const {threads} = getState()
  const thread = threads.filter(thread=>thread.id === id)[0]
  thread && dispatch(actions.addMessage({...thread,messages:[message,...thread.messages]}))
  const party = thread.party1 && (thread.party1.id === uid ? 'party2' : 'party1')
  thread && party && message && await MessageService.addMessage(id,message,party)
}

/**
 * 
 * @param id thread id
 * @param message message data
 */
const receiveMessage = (id:string,messages:Message[]) => async (dispatch:any,getState:()=>AppState) => {
  const {threads} = getState()
  const thread = threads.filter(thread=>thread.id === id)[0]
  thread && dispatch(actions.addMessage({...thread,messages:[...messages,...thread.messages]}))
}

/**
 * 
 * @param id thread id
 */
const clearMessages = (id:string) => async (dispatch:any) => {
  dispatch(actions.clearMessages(id))
}

const updateMessages = (id:string,messages:Message[]) => (dispatch:any) => {
  dispatch(actions.updateMessages({id,messages}))
}

export const threadsActions = {
  getThreads,
  createThread,
  clearThreads:actions.clearThreads,
  updateThread:actions.updateThread,
  getMessages,
  sendMessage,
  clearMessages,
  receiveMessage,
  updateMessages,
}

export type Threads = Thread[]
export interface ThreadMessages {
  id:string,
  messages:Message[]
}