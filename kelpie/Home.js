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
  snow: require('./assets/snow-background.png')
}
export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.state = {
      index: 0, 
      points: 0, 
      appState: AppState.currentState,
      background: 'snow'  
    };
    this.petStatus = 'alive';
    this.state.fontLoaded = false;
    Vibration.vibrate(3000);
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

next() {
  setTimeout(() => {
      this.setState({index: (this.state.index+1)%3, points: this.state.points + 1});
      //console.log(this.state.index, this.state.points);
      this.next();
  }, 1000);

}

  render() {
    
    return (
      <View style={styles.container}>
      {/* <Text>{this.state.appState}</Text> */}
        <View style = {styles.backgroundContainer}>
          <Image source = { petBackground[`${this.state.background}`] } resizeMode = 'cover' style = {styles.backdrop} />
        </View>
        <View style = {styles.pet}>
        {
          this.state.fontLoaded ? (
            <Text style={{ fontFamily: '01 Digit', fontSize: 80 }}>
              {this.state.points}
            </Text>
          ) : null
        }
          <Image
            source={petState[`${this.petStatus}`][this.state.index]}
            style={styles.image}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  points: {
    fontFamily: '01 Digit'
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  pet: {
    marginTop: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300, height: 300,
    justifyContent: 'center'
  }
});

//export default HomeScreen;