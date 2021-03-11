import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import theme from '../../theme'
import { Text, Image, Icon } from 'react-native-elements'
// eslint-disable-next-line no-unused-vars
import { Message, MessageType, MessageMode } from '../../services/threadService'

interface ChatBubbleProps extends Message {
  time:string,
  type?:MessageType,
  msg:string,
  caption?:string,
  mode:MessageMode,
}

const IMAGE_SIZE = Dimensions.get('window').width * 0.4

export default function ChatBubble ({
  type,
  msg,
  caption,
  mode,
  time
  // participant
}:ChatBubbleProps) {
  const style = type === 'send' ? styles.send : styles.receive
  const container = type === 'send' ? styles.sendContainer : styles.container
  const mediaBubbleStyle = mode === 'image' || mode === 'video' ? styles.mediaBubble : {}
  const mediaIcon = mode === 'video' ? 'play' : 'cloud-download-outline'
  const blur = type === 'send' ? 0 : 15
  const showIcon = type !== 'send'
  const mediaBubble = () => {
    return <View style={container}>
      <View style={[style, mediaBubbleStyle]}>
        <Image
          blurRadius={blur}
          source={{
            uri: 'https://picsum.photos/500',
            cache: 'force-cache'
          }}
          resizeMode='cover'
          style={styles.mediaImage}
        >
          <View>
            {showIcon && <Icon
              reverse
              color={theme.colors?.primary}
              name={mediaIcon}
              type='material-community'
              onPress={() => console.log('down')}
            />}
          </View>
          {!caption && <View style={styles.mediaTime}>
            <Text style={[styles.time, styles.mediaTimeText]}>{time}</Text>
            <Icon
              name='check'
              color='white'
            />
          </View>}
        </Image>
        {caption && <View style={styles.caption}>
          <Text>{caption}</Text>
          <View style={styles.captionTime}>
            <Text style={styles.time}>{time}</Text>
            <Icon
              name='check'
              color='black'
            />
          </View>
        </View>}
      </View>
    </View>
  }

  const messageBubble = () => {
    return (
      <View style={container}>
        <View style={[styles.bubble, style]}>
          <Text style={styles.time}>{time}</Text>
          <Text style={styles.msg}>{msg}</Text>
        </View>
      </View>
    )
  }

  return mode === 'image' ||
    mode === 'video'
    ? mediaBubble()
    : messageBubble()
}

const styles = StyleSheet.create({
  container: {
    minHeight: 20,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    elevation: 1
  },
  sendContainer: {
    display: 'flex',
    minHeight: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
    elevation: 1
  },
  mediaBubble: {
    width: IMAGE_SIZE,
    marginHorizontal: Dimensions.get('window').width * 0.02,
    borderRadius: 4,
    padding: 5
  },
  mediaImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bubble: {
    minHeight: 35,
    minWidth: 100,
    maxWidth: '90%',
    marginHorizontal: Dimensions.get('window').width * 0.02,
    borderRadius: 4,
    padding: 5
  },
  send: {
    backgroundColor: '#E7E8CE'
  },
  receive: {
    backgroundColor: '#E2DAEE'
  },
  time: {
    position: 'absolute',
    fontSize: 9,
    right: 5,
    bottom: 1,
    opacity: 0.5
  },
  mediaTime: {
    display: 'flex',
    flexDirection: 'row-reverse',
    position: 'absolute',
    bottom: 0,
    right: 10,
    width: 55,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  captionTime: {
    display: 'flex',
    position: 'absolute',
    width: 55,
    flexDirection: 'row-reverse',
    right: 0,
    bottom: -4
  },
  mediaTimeText: {
    opacity: 1,
    color: 'white'
  },
  msg: {
    fontSize: 13
  },
  caption: {
    paddingVertical: 5,
    fontSize: 13
  }
})
