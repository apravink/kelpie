import React from "react";
import { View,  Button, TextInput, Image } from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { validateUser } from './services/dataService'

class OnboardScreen extends React.Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props)
    this.state = { hatchCode: "", error: false};
    this.handleOnPress = this.handleOnPress.bind(this)
  }

  

  handleOnPress() {
    let isValid = false;
    validateUser(this.state.hatchCode)
    .then(data => {
      isValid = data
      if (isValid) {
        this.props.navigation.dispatch(
          StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Home" })]
          })
        );
      } else {
        this.setState({error:true})
        
      }
    })
    
  }
  
  render() {
    const {error} = this.state
    const borderColor = error ? 'red': 'grey'
    return (
      <View style={{ flex: 2, alignItems: "center", justifyContent: "center" }}>
        {/* <Image source={require('./assets/onboard-background.png')} resizeMode='cover' 
        /> */}
        <Image
          source={require('./assets/egg.png')}
          style={{ top:-5 , width: 200, resizeMode: 'contain', marginLeft: 10, height:200 }}
        />
      
        <TextInput
          style={{height:40, borderColor, borderWidth:2, width:140, marginBottom:8, paddingHorizontal: 2, fontSize: 16}}
          value={this.state.hatchCode}
          onChangeText={text => {
            this.setState({ hatchCode: text });
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
