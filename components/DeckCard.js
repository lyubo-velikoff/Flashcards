import React from 'react'
import { View, StyleSheet, Text  } from 'react-native'
import { gray, black, white } from '../utils/colors'

export default function Deck ({ title, questions }) {
	return (
	  <View style={styles.card}>
      <Text style={{ fontSize: 18, color: black }}>{title}</Text>
      <Text style={{ fontSize: 14, color: gray }}>{questions.length} cards</Text>
	  </View>
	)
  }

const styles = StyleSheet.create({
	card: {
		paddingTop: 40,
		paddingBottom: 40,
		paddingRight: 0,
		backgroundColor: white,
		flexWrap: 'wrap',
		alignItems: 'center',
	},
})