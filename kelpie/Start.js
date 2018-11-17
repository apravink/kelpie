import React from 'react';
import { View, Text, Button } from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

class StartScreen extends React.Component {

  componentDidMount() {
    this.next();
  }
  
  next() {
    setTimeout(() => {

      this.props.navigation.dispatch(StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Onboard' })
        ],
      }))

    }, 5000);
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>This is the loading screen! :)</Text>
      </View>
    );
  }  
}

export default StartScreen;