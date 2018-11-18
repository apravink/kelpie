import React from "react";
import { View,  Button, Text, TextInput, Image, TouchableHighlight } from "react-native";
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

    console.disableYellowBox = true;
    console.reportErrorsAsExceptions = false;

    return (
      <View style={{ 
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        position: 'absolute',
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        //backgroundColor: 'red'
      }}>
        <View style={{ 
          zIndex: 1,
          position: 'absolute',
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}>
          <Image 
            source={require('./assets/onboard-background.png')}
            style={{flex:1, height: undefined, width: undefined}}
            resizeMode="cover"
          />
        </View>
        <View style={{ 
          zIndex: 2,
          position: 'absolute',
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          marginTop: 90
        }}>
          <View
            style={{
              width: "100%",
              height: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end"
            }}
          >
          <Text style={{color: 'white', fontSize: 22, textAlign: 'center', width: 300}}>
          Welcome! Please enter the hatchery code you receive from the Unplug to Connect event.
          </Text>
            <TextInput
              style={{
                height:80,
                borderColor,
                borderWidth:1,
                width:140,
                marginBottom:8,
                paddingHorizontal: 2,
                fontSize: 16,
                borderRadius: 10,
                backgroundColor: '#FFFFFF',
                textAlign: 'center',
                fontSize: 50,
                marginTop: 55
              }}
              value={this.state.hatchCode}
              onChangeText={text => {
                this.setState({ hatchCode: text });
              }}
            />
            {/* <Text>Onboard information</Text> */}
            {/* <Button
              title="Go To Hatchery"
              onPress={this.handleOnPress}
              style={{
                marginBottom: "3%",
                color: "#841584"
              }}
            /> */}
<TouchableHighlight onPress={this.handleOnPress}>
      <Text style={{
                marginBottom: "3%",
                alignItems: 'center',
                backgroundColor:'#1A194C',
                borderRadius:10,
                borderWidth: 0,
                padding: 15,
                fontSize: 24,
                color: '#fff',

                overflow: 'hidden'
              }}>Go To Hatchery</Text>
  </TouchableHighlight>            
            <Image
              source={require('./assets/egg.png')}
              style={{
                maxWidth: "50%",
                maxHeight: "40%",
                marginBottom: "20%"
              }}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    );
  }
}

export default OnboardScreen;
