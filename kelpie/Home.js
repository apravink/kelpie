import React from "react";
import { Font } from "expo";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Vibration,
  AppState,
  TouchableHighlight
} from "react-native";
import { StackActions, NavigationActions } from "react-navigation";
import { setTimestamp } from './services/dataService'

const petState = {
  alive: [
    require("./assets/pet-1.png"),
    require("./assets/pet-2.png"),
    require("./assets/pet-3.png"),
    require("./assets/pet-4.png"),
    require("./assets/pet-5.png"),
    require("./assets/pet-6.png"),
    require("./assets/pet-7.png"),
    require("./assets/pet-8.png"),
    require("./assets/pet-9.png")
  ],
  tired: [
    require("./assets/petdead-1.png"),
    require("./assets/petdead-2.png"),
    require("./assets/petdead-3.png"),
    require("./assets/petdead-4.png"),
    require("./assets/petdead-5.png"),
    require("./assets/petdead-6.png"),
    require("./assets/petdead-7.png"),
    require("./assets/petdead-8.png"),
    require("./assets/petdead-9.png"),
    require("./assets/petdead-10.png")
  ],
  running: [
    require("./assets/petrun-1.png"),
    require("./assets/petrun-2.png"),
    require("./assets/petrun-3.png"),
    require("./assets/petrun-4.png"),
    require("./assets/petrun-5.png"),
    require("./assets/petrun-6.png"),
    require("./assets/petrun-7.png"),
    require("./assets/petrun-8.png")
  ]
};
const petBackground = {
  snow: require("./assets/snow-background.png"),
  beach: require("./assets/beach-background.png")
};
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.state = {
      index: 0,
      points: 0,
      appState: AppState.currentState,
      background: "snow",
      petStyle: {
        marginTop: 0,
        alignItems: "center",
        justifyContent: "center",
        width: 300,
        height: 300
      },
      timeScreenOut: "",
      timeScreenOn:"",
      fontLoaded: false
    };

    this.petStatus = "alive";
    Vibration.vibrate(1000);

    setInterval(() => {
      let rand = Math.round(Math.random());
      let rand2 = Math.round(Math.random());
      let tiredRandom = Math.round(Math.random());

      (rand2 == 0) ? this.petStatus = 'alive' : this.petStatus = 'running';

      if (rand == 0) {
        this.setState({
          petStyle: {
            marginTop: 0,
            alignItems: "center",
            justifyContent: "center",
            width: 300,
            height: 300
          }
        });
      } else {
        this.setState({
          petStyle: {
            marginTop: 0,
            alignItems: "center",
            justifyContent: "center",
            transform: [{ scaleX: -1 }],
            width: 300,
            height: 300
          }
        });
      }

      (tiredRandom == 0) ? '' : this.petStatus = 'tired';

    }, 5000);
  

    setInterval(() => {
      this.setState({
        points: this.state.points += Math.floor((Math.random() * 5) + 1)
      });
    }, 10000);

    this._onLogout = this._onLogout.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  async loadAsyncAssets() {
    await Font.loadAsync({
      "01 Digit": require("./assets/fonts/01_Digit.ttf")
    }).then(() => {
      this.setState({ fontLoaded: true });
    });
  }

  componentDidMount() {
    this.loadAsyncAssets();
    AppState.addEventListener("change", this._handleAppStateChange);

    this.next();
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      // console.log('appState',this.state.appState)
      this.setState({timeScreenOn: Date.now()})
      const {timeScreenOn, timeScreenOut} = this.state;
      setTimestamp(timeScreenOut, timeScreenOn)
    } else if(this.state.appState.match(/active/) && nextAppState === "background") {
      this.setState({timeScreenOut:Date.now()})
      // console.log('appState', this.state.appState)
    }


    // console.log(nextAppState);
    this.setState({ appState: nextAppState });
  };

  _onLogout() {
    const { fontLoaded } = this.state
    if (fontLoaded === true) {
      // setTimestamp(timeIn, Date.now())
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: "Onboard" })]
        })
      );
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _convertStatus(status) {
    if (status == "alive" || status == "running") {
      return "Happy 😄";
    } else {
      return "Feeling tired 😴"
    }
  }

  next() {
    setTimeout(() => {
      this.setState({
        index: (this.state.index + 1) % petState[`${this.petStatus}`].length,
        //points: this.state.points + 1
      });
      //console.log(this.state.index, this.state.points);
      this.next();
    }, 150);
  }

  render() {
    // console.log(this.state.timeIn, this.state.timeOut);
    return (
      <View style={styles.container}>
        {/* <Text>{this.state.appState}</Text> */}
        <View style={styles.backgroundContainer}>
          <Image
            source={petBackground[`${this.state.background}`]}
            resizeMode="cover"
            style={styles.backdrop}
          />
        </View>
        <View style={styles.petContainer}>
          {/* <Text
            onPress={this._onLogout}
            style={{
              textAlign: "right",
              alignSelf: "stretch",
              marginTop: -85,
              marginBottom: 0
            }}
          > */}
     <TouchableHighlight onPress={this._onLogout}>
     <Image source={require("./assets/logout.png")} style={{ right: 0 }} onPress={this._onLogout} />
    </TouchableHighlight>
            
          {this.state.fontLoaded ? (
            <Text
              style={{
                fontFamily: "01 Digit",
                fontSize: 90,
                marginTop: 20,
                marginBottom: 15
              }}
            >
              {this.state.points}
            </Text>
          ) : null}
          <Image
            source={petState[`${this.petStatus}`][this.state.index]}
            style={this.state.petStyle}
          />

          <Text
            style={{
              overflow: "hidden",
              borderWidth: 0,
              backgroundColor: "#F9DFA2",
              borderColor: "#000",
              borderRadius: 12,
              fontSize: 26,
              padding: 15,
              marginTop: 15
            }}
          >
            {this._convertStatus(this.petStatus)}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  points: {
    fontFamily: "01 Digit"
  },
  backgroundContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  petContainer: {
    marginTop: 70,
    alignItems: "center",
    justifyContent: "center"
  }
});

//export default HomeScreen;
