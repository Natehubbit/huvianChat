/* eslint-disable no-unused-vars */
import { threads, Message } from './threadService'
import alert from '../helper/alert'
import firebase from 'firebase'
import fbase from '../config/firebase'

const increment = firebase.firestore.FieldValue.increment(1)

export default class MessageService {
  /**
   *
   * @param id id of thread
   * @param message message content
   * @param message message payload
   * @param party participant sender
   */
  static async addMessage (id:string, message:Message, party:string):Promise<Message | null> {
    try {
      const messages = threads.doc(id).collection('messages').doc()
      const threadRef = threads.doc(id)
      const batch = fbase.db.batch()
      const msgId = messages.id
      console.log(message)
      message && batch.set(messages, { ...message, id: msgId })
      batch.update(
        threadRef,
        {
          lastChatTimestamp: message.timestamp,
          [`${party}.count`]: increment
        }
      )
      await batch.commit()
      return { ...message, id: messages.id }
    } catch (e) {
      alert('Error', e.message)
      return null
    }
  }

  /**
   *
   * @param id thread id
   * @param uid user id
   * @param pid participant id
   * @param count no. of unread messages
   * @param dispatch dispatch function
   * @param action action creator
   */
  static receiveMessageListener (id:string, pid:string, count:number, dispatch:any, action:any) {
    try {
      if (!count) return () => {}
      const threadRef = threads.doc(id)
      const messagesRef = threadRef.collection('messages')
      return messagesRef
        .where('sender', '==', pid)
        .orderBy('timestamp', 'desc')
        .limit(count)
        .onSnapshot(snapshot => {
          if (snapshot.empty) return
          const type = 'receive'
          const messages = snapshot.docs.map(d => ({ ...d.data(), id: d.id, type }))
          console.log('new', messages)
          messages.length > 0 && dispatch(action(id, messages))
        })
    } catch (e) {
      alert('Error', e.message)
      return () => {}
    }
  }

  /**
   * @param id thread id
   * @param uid user id
   */
  static async getMessages (id:string, uid:string):Promise<Messages> {
    try {
      const messages:Messages = []
      const data = await threads.doc(id)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .get()
      if (data.empty) return []
      !data.empty && data.forEach(async snapshot => {
        const data = snapshot.data()
        const { id, msg, mode, ...d }:Message = { id: snapshot.id, msg: data.msg, mode: data.mode, ...data }
        const snap:Message = {
          id,
          msg,
          mode,
          ...d
        }
        const type = snap.sender === uid ? 'send' : 'receive'
        messages.push({
          ...snap,
          type
        })
      })
      return await Promise.all(messages)
    } catch (e) {
      alert('Error', e.message)
      return []
    }
  }
}

export type Messages = Message[]
