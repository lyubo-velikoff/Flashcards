import React from 'react'
import { Platform } from 'react-native'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { black, white } from './colors'
import AddDeck from '../components/AddDeck'
import Decks from '../components/Decks'
import DeckDetail from '../components/DeckDetail'
import AddCard from '../components/AddCard'
import Quiz from '../components/Quiz'

const Tabs = TabNavigator ({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="cards" size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <Entypo name="squared-plus" size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? black : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : black,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetail: {
    screen: DeckDetail,
  },
  AddCard: {
    screen: AddCard,
  },
  Quiz: {
    screen: Quiz,
  }
}, {
  navigationOptions: {
    headerBackTitle: null,
    headerTintColor: white,
    headerStyle: {
      backgroundColor: black
    }
  },
})

export default MainNavigator