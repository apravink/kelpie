import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; // Version can be specified in package.json
import StartScreen from './Start';
import OnboardScreen from './Onboard';
import HomeScreen from './Home';

const AppNavigator = createStackNavigator({
  Start: {
    screen: StartScreen,
  },
  Onboard: {
    screen: OnboardScreen,
  },
  Home: {
    screen: HomeScreen,
  },
}, {
    initialRouteName: 'Home',
});

export default createAppContainer(AppNavigator);