import React from 'react'
import { TouchableOpacity, Platform, StyleSheet, Text } from 'react-native'
import { white, black } from '../utils/colors'

export default function Button ({ onPress, text, backgroundColor }) {

	return (
		<TouchableOpacity
      style={[
        Platform.OS === 'ios' ? styles.iosButton : styles.androidButton,
        { backgroundColor: backgroundColor ? backgroundColor : black }
      ]}
      onPress={onPress}
    >
      <Text style={styles.submitBtnText}>{text}</Text>
		</TouchableOpacity>
	)

}

const styles = StyleSheet.create({
  submitBtnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
  iosButton: {
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    marginTop: 10,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  androidButton: {
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    marginTop: 10,
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
  }
})