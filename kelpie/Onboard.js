import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { validateUser } from './services/dataService'

class OnboardScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)
    this.state = { hatchCode: "", validated: false };
    this.handleOnPress = this.handleOnPress.bind(this)
  }



  handleOnPress() {
    const isValid = validateUser(this.state.hatchCode)
    console.log(this.state.hatchCode)
    if(isValid === true) {
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Home" })]
        })
      );
    }
  }
  
  render() {
    console.log('state',this.state.hatchCode)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextInput
          style={{height:40, borderColor:'gray', borderWidth:1, width:100, marginBottom:8}}
          value={this.state.hatchCode}
          onChangeText={text => {
            if(text) this.setState({ hatchCode: text });
          }}
        />
        {/* <Text>Onboard information</Text> */}
        <Button
          title="Go To Hatchery"
          onPress={this.handleOnPress}
        />
      </View>
    );
  }
}

export default OnboardScreen;
