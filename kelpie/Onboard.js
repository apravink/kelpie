import React from "react";
import { View, Text, Button, TextInput } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";

class OnboardScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hatchCode: " " };
  }

  handleOnPress() {}
  
  render() {
    console.log('state',this.state.hatchCode)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TextInput
          style={{height:40, borderColor:'gray', borderWidth:1, width:80,marginBottom:8}}
          value={this.state.hatchCode}
          onChangeText={text => {
            this.setState({ hatchCode: text });
          }}
        />
        {/* <Text>Onboard information</Text> */}
        <Button
          title="Go To Hatchery"
          onPress={() => {
            this.props.navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "Home" })]
              })
            );
          }}
        />
      </View>
    );
  }
}

export default OnboardScreen;
