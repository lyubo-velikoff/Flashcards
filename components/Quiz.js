import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { white, black } from '../utils/colors'
import Button from './Button'
import TextButton from './TextButton'
import { setLocalNotification, clearLocalNotifications } from '../utils/_notification'

class Quiz extends Component {
  
  static navigationOptions = ({ navigation }) => {
		return {
			title: 'Quiz'
		}
  }

  state = {
    index: 0,
    correctAnswers: 0,
    revealAnswer: false,
  }

  processQuiz = () => {
    const { questions } = this.props.navigation.state.params
    const { index } = this.state

    if (index < questions.length - 1 ) {
      this.setState({ index: index + 1 })
    } else {
      clearLocalNotifications()
        .then(setLocalNotification)

      this.showAlert(questions)
    }

  }

  showAlert = (questions) => {
    const { correctAnswers } = this.state
    const { navigation } = this.props
    console.log(correctAnswers)
    Alert.alert(
      'Your score: ' + Math.round( (correctAnswers / questions.length) * 100 ) + '%',
      `You have ${correctAnswers} correct answers out of ${questions.length} questions. Try again?`,
      [
          { text: 'Yes', onPress: () => this.setState({ 
            index: 0, 
            correctAnswers: 0, 
            revealAnswer: false 
          })},
          { text: 'No', onPress: () => navigation.goBack()},
      ],
      { cancelable: false }
    )
  }

  quizActions = (questions) => {
    return (
      <View>
        <Button text='Correct' onPress={() => {
          this.setState({ correctAnswers: this.state.correctAnswers + 1 }, this.processQuiz)
        }} />
        <Button text='Incorrect' onPress={() => this.processQuiz()} />
      </View>
    )
  }

  remainingCounter = (index, questions) => {
    return (
      <View style={styles.remaining}>
        <Text style={styles.remainingText}>{index + 1}/{questions.length}</Text>
      </View>
    )
  }

  render() {
		const { questions } = this.props.navigation.state.params
    const { index, showResults, revealAnswer } = this.state

    const card = revealAnswer ? (
      <Text style={styles.card} key={questions[index].answer}>{questions[index].answer}</Text>
    ) : (
      <Text style={styles.card} key={questions[index].question}>{questions[index].question}</Text>
    )

    return (
      <View style={{ flex: 1 }}>
        {this.remainingCounter(index, questions)}
        <View style={styles.container}>
          {questions && questions[index] && (
            <View>{card}</View>
          )}
          <TextButton style={{ padding: 20 }} onPress={() => this.setState({ revealAnswer: !revealAnswer })}>
            {revealAnswer ? 'Question' : 'Answer'}
          </TextButton>
          {this.quizActions(questions)}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  remaining: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 20,
  },
  remainingText: {
    textAlign: 'left',
    fontSize: 16
  },
  card: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  }
})

export default Quiz