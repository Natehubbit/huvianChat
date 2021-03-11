/* eslint-disable no-unused-vars */
import firebase from '../config/firebase'
import alert from '../helper/alert'
import UserService, { User } from './userService'
import { Threads } from '../store/threads'
import MessageService from './messageService'

export const threads = firebase.db.collection('threads')

export default class ThreadService {
  /**
    * @param userId id of current user
    * @param id id of chat participant
    */
  static async createThread (userId:string, participantId:string, type?:ThreadType):Promise<Thread | null> {
    try {
      const data:Thread = {
        type: type || 'single',
        participants: [userId, participantId],
        party1: { id: userId, count: 0 },
        party2: { id: participantId, count: 0 },
        createdAt: new Date().toISOString(),
        participant: { id: '', name: '' },
        messages: []
      }
      const { id: threadId } = await threads.add(data)
      return threadId ? { id: threadId, ...data } : null
    } catch (e) {
      alert('Error', e.message)
      return null
    }
  }

  /**
   *
   * @param id thread id
   * @param uid user id
   */
  static async getThread (id:string, uid:string):Promise<Thread|null> {
    try {
      const data:Thread = {
        messages: [],
        ...(await threads.doc(id).get()).data(),
        participant: { id: '', name: '' }
      }
      if (data.type === 'single') {
        const { party1, party2 } = data
        const count = party1?.id === uid ? party1.count : party2?.count
        return { ...data, count }
      }
      return { id, ...data }
    } catch (e) {
      alert('Error', e.message)
      return null
    }
  }

  /**
   *
   * @param id user id
   */
  static async getThreads (id:string) : Promise<Threads|null> {
    try {
      const data = await threads
        .where('participants', 'array-contains', id)
        .get()
      if (data.empty) return []
      const threadList = data.docs.map(async (d):Promise<Thread> => {
        const { participants, ...data } = d.data()
        const partyId = participants.filter((i:string) => i !== id)[0]
        const participant = (partyId && await UserService.getUser(partyId)) ||
          { id: '', name: '' }
        const messages = (d.id && await MessageService.getMessages(d.id, id)) ||
          []
        const thread:Thread = {
          id: d.id,
          messages,
          participants,
          participant,
          ...data
        }
        return thread
      })
      return await Promise.all(threadList)
    } catch (e) {
      alert('Error', e.message)
      return null
    }
  }

  /**
   *
   * @param id thread id
   * @param dispatch dispatch function
   * @param action action creator
   */
  static threadListener = (id:string, dispatch:any, action:any) => {
    try {
      return threads.doc(id)
        .onSnapshot(doc => {
          const data:ThreadResponse = { id, ...doc.data() }
          dispatch(action(data))
        })
    } catch (e) {
      alert('Error', e.message)
      return null
    }
  }

  /**
   * @param id thread id
   */
  static async deleteThread (id:string) {
    try {
      await threads.doc(id).delete()
      return true
    } catch (e) {
      console.log(e.message)
      return null
    }
  }
}

export interface Thread {
  id?:string,
  participants?:string[],
  participant:User,
  party1?:Party,
  party2?:Party,
  messages:Message[],
  lastChatTimestamp?:string,
  count?:number,
  type?:ThreadType,
  createdAt?:string
}

export interface ThreadResponse {
  id:string,
  participants?:string[],
  party1?:Party,
  party2?:Party,
  lastChatTimestamp?:string,
  count?:number,
  type?:ThreadType,
  createdAt?:string
}

export interface Party {
  id:string,
  count:number,
  active:boolean,
}

export interface Message {
  id:string;
  msg:string;
  timestamp?:string;
  sender?:string;
  mode: MessageMode;
  type?: MessageType;
  status?:MessageStatus;
  caption?:string;
}

export type ThreadType = 'single'|'group'
export type MessageMode = 'image'|'video'|'text'|'doc'
export type MessageStatus = 'seen'|'delivered'|'error'
export type MessageType = 'send'|'receive'
