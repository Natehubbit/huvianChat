import React, { useEffect } from 'react'
import { FlatList } from 'react-native-gesture-handler'
import ChatBubble from '../ChatBubble'
import { useLoading } from '../../hooks/useLoading'
import Loader from '../Loader'
import { View, StyleSheet } from 'react-native'
// eslint-disable-next-line no-unused-vars
import { Message } from '../../services/threadService'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import MessageService from '../../services/messageService'
import { useUser } from '../../hooks/useUser'
import { useUnreadCount } from '../../hooks/useUnreadCount'
import { threadsActions } from '../../store/threads'
import { useParticipant } from '../../hooks/userParticipant'

interface MessagesProps {
  messages:Message[],
  id:string
}

const MessageList = ({
  messages,
  id
}:MessagesProps) => {
  const { loadingMessages } = useLoading()
  const user = useUser()
  const participant = useParticipant(id)
  const count = useUnreadCount(id, user.id)
  const dispatch = useDispatch()
  useEffect(() => {
    const unsubscribe = user.id && participant.id
      ? MessageService.receiveMessageListener(
        id,
        participant.id,
        count,
        dispatch,
        threadsActions.receiveMessage
      )
      : () => {}
    return () => unsubscribe()
  }, [])
  const renderChat = ({
    item: { timestamp, ...props }
  }:{item:Message}) => {
    const time = moment(timestamp).format('h:mm a')
    return <ChatBubble
      {...props}
      time={time}
    />
  }
  return <View style={styles.container}>
    {loadingMessages ? <Loader/> : <FlatList
      keyboardShouldPersistTaps="never"
      inverted
      keyExtractor={(item, index) => index.toString()}
      data={messages}
      renderItem={renderChat}
    />}
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default MessageList
