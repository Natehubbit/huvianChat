import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, Keyboard } from 'react-native'
import { Icon } from 'react-native-elements'
import theme from '../../theme'
// eslint-disable-next-line no-unused-vars
import { Message } from '../../services/threadService'
import { useUser } from '../../hooks/useUser'
import { useDispatch } from 'react-redux'
import { threadsActions } from '../../store/threads'
import { useThreads } from '../../hooks/useThreads'
import { useThread } from '../../hooks/useThread'

interface InputBoxProps {
  id:string
}

export default function InputBox ({
  id
}:InputBoxProps) {
  const [showEmoji, setShowEmoji] = useState(false)
  const [input, setInput] = useState('')
  const dispatch = useDispatch()
  const thread = useThread(id)
  const user = useUser()
  useEffect(() => {
    const keyboardShow = Keyboard.addListener('keyboardDidShow', handleKeyboardShow)
    return () => keyboardShow.remove()
  }, [])
  useEffect(() => {
    if (showEmoji) {
      Keyboard.dismiss()
    }
  }, [showEmoji])
  const handleKeyboardShow = () => {
    setShowEmoji(false)
  }
  const handleEmoji = () => {
    setShowEmoji(true)
  }
  const handleSend = () => {
    if (!input) return
    Keyboard.dismiss()
    const message:Message = {
      id: '',
      caption: '',
      mode: 'text',
      msg: input,
      sender: user.id,
      type: 'send',
      timestamp: new Date().toISOString()
    }
    console.log(user.id)
    user.id && dispatch(threadsActions.sendMessage(id, message, user.id))
    setInput('')
  }
  return (
    <>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.icon}>
            <Icon
              name='emoticon-kiss-outline'
              type='material-community'
              color={theme.colors?.primary}
              size={22}
              onPress={handleEmoji}
            />
          </View>
          <TextInput
            multiline
            placeholder="Babe misses you. Send a message....."
            style={styles.input}
            value={input}
            onChangeText={setInput}
          />
          <View style={styles.icon}>
            <Icon
              reverse
              size={15}
              name='send'
              color={theme.colors?.primary}
              onPress={handleSend}
            />
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    backgroundColor: 'transparent',
    maxHeight: 120,
    justifyContent: 'center'
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '96%',
    alignSelf: 'center',
    alignItems: 'center',
    marginVertical: 10,
    overflow: 'hidden'
  },
  input: {
    overflow: 'scroll',
    flex: 6,
    minHeight: 50
  },
  icon: {
    flex: 1,
    justifyContent: 'flex-end'
  }
})
