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

// addCardToDeck