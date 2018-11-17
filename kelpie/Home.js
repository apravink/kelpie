import React from 'react';
import { AppRegistry, Image, StyleSheet, Text, View, Vibration, AppState } from 'react-native';
import { Font, AppLoading } from "expo";

const petState = { 
  alive: [
    require('./assets/pet-1.png'),
    require('./assets/pet-2.png'),
    require('./assets/pet-3.png'),
    require('./assets/pet-4.png'),
    require('./assets/pet-5.png'),
    require('./assets/pet-6.png'),
    require('./assets/pet-7.png'),
    require('./assets/pet-8.png'),
    require('./assets/pet-9.png'),
  ],
  dead: [
    require('./assets/petdead-1.png'),
    require('./assets/petdead-2.png'),
    require('./assets/petdead-3.png'),
    require('./assets/petdead-4.png'),
    require('./assets/petdead-5.png'),
    require('./assets/petdead-6.png'),
    require('./assets/petdead-7.png'),
    require('./assets/petdead-8.png'),
    require('./assets/petdead-9.png'),
    require('./assets/petdead-10.png'),
  ]
}
const petBackground = {
  snow: require('./assets/snow-background.png'),
  beach: require('./assets/beach-background.png'),
}
export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.state = {
      index: 0, 
      points: 0, 
      appState: AppState.currentState,
      background: 'snow', 
      petStyle: {
          marginTop: 0,
          alignItems: 'center',
          justifyContent: 'center',
          width: 300, height: 300,
        }
    };
    this.petStatus = 'alive';
    this.state.fontLoaded = false;
    Vibration.vibrate(1000);

    setInterval(() => {

      let rand = Math.round(Math.random());

      if(rand == 0) {
        this.setState(
          { 
            petStyle: { 
              marginTop: 0,
              alignItems: 'center',
              justifyContent: 'center',
              width: 300, 
              height: 300 
          }}
          );
      } else {
        this.setState(
          { 
          petStyle: { 
            marginTop: 0,
            alignItems: 'center',
            justifyContent: 'center',
            transform: [{ scaleX: -1}],
            width: 300, 
            height: 300 
          }}
          );
      }

  }, 5000);

}

static navigationOptions = {
  header: null
}

async componentWillMount() {
  await Expo.Font.loadAsync({
    '01 Digit': require('./assets/fonts/01_Digit.ttf'),
  });
  this.setState({ fontLoaded: true });
}

componentDidMount() {
  AppState.addEventListener('change', this._handleAppStateChange);
  this.next();
}

_handleAppStateChange = (nextAppState) => {
  if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
  }

  console.log(nextAppState);
  this.setState({appState: nextAppState});
}

componentWillUnmount() {
  AppState.removeEventListener('change', this._handleAppStateChange);
}

_convertStatus(status) {
  if(status == 'alive') {
    return "Happy 😄"
  }
}

next() {
  setTimeout(() => {
      this.setState({index: (this.state.index+1)%(petState[`${this.petStatus}`].length), points: this.state.points + 1});
      //console.log(this.state.index, this.state.points);
      this.next();
  }, 200);

}

  render() {
    
    return (
      <View style={styles.container}>
      {/* <Text>{this.state.appState}</Text> */}
        <View style = {styles.backgroundContainer}>
          <Image source = { petBackground[`${this.state.background}`] } resizeMode = 'cover' style = {styles.backdrop} />
        </View>
        <View style={styles.petContainer}>
        {
          this.state.fontLoaded ? (
            <Text style={{ fontFamily: '01 Digit', fontSize: 90, marginBottom: 15 }}>
              {this.state.points}
            </Text>
          ) : null
        }
          <Image
            source={petState[`${this.petStatus}`][this.state.index]}
            style={this.state.petStyle}
          />

          <Text style={{ overflow: 'hidden', borderWidth: 1, backgroundColor: '#F9DFA2', borderColor: '#000', borderRadius: 12, fontSize: 26, padding: 10, marginTop: 15 }}>{this._convertStatus(this.petStatus)}</Text>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  points: {
    fontFamily: '01 Digit',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  // pet: {
  //   marginTop: 0,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   transform: [{ scaleX: -1}],
  //   width: 300, height: 300,
  // },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  petContainer: {
    marginTop: 150,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

//export default HomeScreen;