import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { white, black, gray } from '../utils/colors'
import Button from './Button'

class AddDeck extends Component {
	state = {
    title: ''
  }

  handleChange (fieldName, fieldValue) {
    this.setState((state) => {
      return {
        ...state,
        [fieldName]: fieldValue
      }
    })
  }

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.label}>What is the title of your new deck ?</Text>
        <TextInput
          style={styles.input}
          onChangeText={(title) => this.handleChange('title', title)}
          value={this.state.answer}
          placeholder='Deck title'
          placeholderTextColor={gray}
        />
        <Button text='Submit' onPress={() => console.log('pressed')} />
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
    backgroundColor: white,
    justifyContent: 'center'
  },
  input: {
    height: 50,
    borderColor: black,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
    padding: 7
  },
  label: {
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'center'
  }
})

function mapStateToProps (state) {
	return {}
}

export default connect(mapStateToProps)(AddDeck)