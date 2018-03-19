import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { white, black } from '../utils/colors'

class AddDeck extends Component {
	state = {}
	render() {
		return (
			<View style={styles.container}>
				<Text>This is add deck component.</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: white,
	}
})

function mapStateToProps (state) {
	return {}
}

export default connect(mapStateToProps)(AddDeck)