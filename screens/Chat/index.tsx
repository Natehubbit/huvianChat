import React, { useEffect, useState } from 'react'
import { StyleSheet, ImageBackground, Dimensions } from 'react-native'
import ChatHeader from '../../components/ChatHeader'
import MessageList from '../../components/MessageList'
import InputBox from '../../components/MessageBox'
import { useMessages } from '../../hooks/useMessages'
import { useDispatch } from 'react-redux'
import { useUser } from '../../hooks/useUser'
import { threadsActions } from '../../store/threads'
import { useThreads } from '../../hooks/useThreads'
import ThreadService, { Message } from '../../services/threadService'
import { useThread } from '../../hooks/useThread'
import { useLoading } from '../../hooks/useLoading'

interface ChatScreenProps {

}

export default function Chat (props:ChatScreenProps) {
  const threadId = 'ezOP0Fyn8sr6H2X1uMMg'
  const { loadingThreads } = useLoading()
  const thread = useThread(threadId)
  const { participant } = thread || {
    id: '', name: '', image: ''
  }
  const dispatch = useDispatch()
  const messages = useMessages(threadId)

  return (
    <ImageBackground
      style={styles.container}
      source={require('../../assets/wall.jpg')}
    >
      <ChatHeader
        name={participant?.name}
        status={participant?.status}
        id={participant?.id}
        image={participant?.image}
      />
      <MessageList
        messages={messages}
        id={threadId}
        // participant={participant?.name}
      />
      <InputBox
        id={threadId}
      />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundImg: {
    width: '100%',
    height: Dimensions.get('window').height
  }
})
