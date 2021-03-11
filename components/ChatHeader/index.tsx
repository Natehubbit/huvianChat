import React, { useEffect } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import theme from '../../theme'
import { Avatar, Text, Icon } from 'react-native-elements'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
// eslint-disable-next-line no-unused-vars
import UserService, { User } from '../../services/userService'
import { threadsActions } from '../../store/threads'
import { useThreads } from '../../hooks/useThreads'

type ChatHeaderProps = User

export default function ChatHeader ({
  name,
  status,
  image,
  id
}:ChatHeaderProps) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const handleMenuPressed = () => console.log('pressed')
  useEffect(() => {
    const unsubscribe = id
      ? UserService.userListener(id, dispatch, threadsActions.updateThread)
      : () => {}
    return () => unsubscribe()
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.back}>
        <Icon
          onPress={() => navigation.goBack()}
          name='arrow-left'
          type='material-community'
          size={25}
        />
      </View>
      <View style={styles.dp}>
        <Avatar
          source={{
            uri: image
          }}
        />
      </View>
      <View style={styles.body}>
        <TouchableNativeFeedback style={styles.touchable} >
          <Text style={styles.name}>{name}</Text>
          <Text>{status}</Text>
        </TouchableNativeFeedback>
      </View>
      <View style={styles.icon}>
        <Icon
          name='attachment'
          onPress={handleMenuPressed}
          size={23}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: 60,
    backgroundColor: theme.colors?.primary,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  dp: {
    flex: 2,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center'
  },
  body: {
    flex: 12
  },
  touchable: {
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  name: {
    fontWeight: 'bold'
  },
  status: {

  },
  icon: {
    flex: 2,
    transform: [{ rotate: '270deg' }]
  },
  back: {
    display: 'flex',
    flex: 2,
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center'
  }
})
