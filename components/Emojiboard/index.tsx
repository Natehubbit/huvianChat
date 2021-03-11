import React, { useEffect } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'
import { Text } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

interface EmojiboardProps{
    show:boolean,
    showEmoji: (val:boolean) => void
}

const finalHeight = Dimensions.get('window').height * 0.4
const emojiHeight = new Animated.Value(0)

const Emojiboard = ({
  show
}:EmojiboardProps) => {
  useEffect(() => {
    if (show) {
      showBoard()
    } else {
      hideBoard()
    }
  }, [show])
  const showBoard = () => {
    Animated.timing(emojiHeight, {
      toValue: finalHeight,
      duration: 5,
      easing: Easing.linear
    }).start()
  }
  const hideBoard = () => {
    Animated.timing(emojiHeight, {
      toValue: 0,
      duration: 5,
      easing: Easing.linear
    }).start()
  }

  const renderEmojis = () => {
    return <TouchableOpacity>
      <Text style={styles.emoji}>em</Text>
    </TouchableOpacity>
  }

  return (
    <Animated.View style={[{ height: emojiHeight }, styles.container]}>
      <ScrollView>
        <View style={styles.content}>
          {renderEmojis()}
        </View>
      </ScrollView>
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  content: {
    // minHeight: finalHeight - 20,
    width: Dimensions.get('window').width - 20,
    backgroundColor: 'red',
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  emoji: {
    fontSize: 20
  }
})
export default Emojiboard
