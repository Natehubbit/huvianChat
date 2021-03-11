import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Chat from '../screens/Chat'
import { threadsActions } from '../store/threads'
import { useUser } from '../hooks/useUser'
import { useDispatch } from 'react-redux'
import { userActions } from '../store/user'
import ThreadService from '../services/threadService'

const Stack = createStackNavigator()

const routes = () => {
  return <Stack.Navigator headerMode="none" >
    <Stack.Screen name="Chat" component={Chat} />
  </Stack.Navigator>
}

export default function Navigation () {
  const dispatch = useDispatch()
  const user = useUser()
  const threadId = 'ezOP0Fyn8sr6H2X1uMMg'
  console.disableYellowBox = true
  useEffect(() => {
    const emulate = async () => {
      dispatch(userActions.getUser('W0Ofx4GhkL73xwsaRHNC'))
      user.id && dispatch(threadsActions.getThreads(user.id))
    }
    emulate()
  }, [])

  useEffect(() => {
    ThreadService.threadListener(threadId, dispatch, threadsActions.updateThread)
  }, [])

  return <NavigationContainer>
    {routes()}
  </NavigationContainer>
}
