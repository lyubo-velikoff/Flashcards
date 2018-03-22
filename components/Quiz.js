import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white, black } from '../utils/colors'
import Button from './Button'
import TextButton from './TextButton'

class Quiz extends Component {
  
  static navigationOptions = ({ navigation }) => {
		return {
			title: 'Quiz'
		}
  }

  state ={

  }

  render() {
		const { questions } = this.props.navigation.state.params

    return (
      <View style={styles.container}>
        {questions.map(question => {
          return <Text style={styles.question} key={question.question}>{question.question}</Text>
        })}
        <TextButton style={{ padding: 10 }} onPress={() => console.log('reveal answer')}>
          Answer
        </TextButton>
        <Button text='Correct' onPress={() => console.log('pressed')} />
        <Button text='Incorrect' onPress={() => console.log('pressed')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  question: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  }
})

export default connect()(Quiz)