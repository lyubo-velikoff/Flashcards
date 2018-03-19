import { AsyncStorage } from 'react-native'

export const DECK_STORAGE_KEY = 'Flashcards:deck'

const decks = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}


function setDummyData () {
  AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
  return decks
}

export function formatDeckResults (results) {
  return results === null ? setDummyData() : JSON.parse(results)
}
