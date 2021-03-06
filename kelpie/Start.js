import React from "react";
import { View, ActivityIndicator, Image } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";

class StartScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.next();
  }

  next() {
    setTimeout(() => {
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Onboard" })]
        })
      );
    }, 3000);
  }

  render() {
    // getPetStatus().then(console.log)
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Image
          source={require("./assets/bgc-logo.png")}
          style={{
            marginTop: -15,
            width: 400,
            resizeMode: "contain",
            marginLeft: "32%",
            marginBottom: 15
          }}
        />
        <ActivityIndicator size="large" />
      </View>
    );
  }
}

export default StartScreen;
