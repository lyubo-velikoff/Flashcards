import { AsyncStorage } from 'react-native'
import { DECK_STORAGE_KEY, formatDeckResults } from './_deck'

// getDecks
export function fetchDeckResults() {
	return AsyncStorage.getItem(DECK_STORAGE_KEY)
		.then(formatDeckResults)
}

// getDeck
export function fetchDeck(key) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      return data[key]
    })
}

// add deck
export function saveDeckTitle(title) {
	return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
		[title]: {
      title: title,
      questions: []
    }
	}))
}

// add card to deck
export function addCardToDeck(title, card) {
  // return AsyncStorage.removeItem(DECK_STORAGE_KEY)
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[title].questions.push(card)
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}

// delete deck
export function removeDeck(key) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[key] = undefined
      delete data[key]
      AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data))
    })
}