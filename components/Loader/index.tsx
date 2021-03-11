import React from 'react'
import Lottie from 'lottie-react-native'
import loader from '../../assets/lottie/loader.json'
import { View, StyleSheet, Dimensions } from 'react-native'

const Loader = () => {
  return (
    <Lottie
      source={loader}
      style={styles.loader}
      autoPlay
      loop
    />

  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  loader: {
    height: 60,
    width: 60,
    position: 'absolute',
    top: 0,
    alignSelf: 'center'
  }
})

export default Loader
