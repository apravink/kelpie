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
import { setTimestamp, getPetStatus } from "./services/dataService";
import { calculatePetAnimation } from "./services/util";

const petState = {
  angryhappy: [
    require("./assets/angry-happy-angry1.png"),
    require("./assets/angry-happy-angry2.png")
  ],
  happy: [require("./assets/happy1.png"), require("./assets/happy2.png")],
  neutral: [require("./assets/neutral1.png"), require("./assets/neutral2.png")],
  sadangry: [
    require("./assets/sad-angry1.png"),
    require("./assets/sad-angry2.png")
  ],
  sad: [require("./assets/sad1.png"), require("./assets/sad2.png")]
};
const pointsToPetStatusMap = {
  angryhappy: 0,
  sad: -1,
  happy: 5,
  neutral: 1,
  sadangry: -5
};
const petBackground = {
  snow: require("./assets/snow-background.png"),
  beach: require("./assets/beach-background.png"),
  forest: require("./assets/background_forrest.png")
};
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.state = {
      petAnimation: "sadangry",
      index: 0,
      points: 1,
      appState: AppState.currentState,
      background: "forest",
      petStyle: {
        marginTop: 0,
        alignItems: "center",
        justifyContent: "center",
        width: 300,
        height: 300
      },
      timeScreenOut: "",
      timeScreenOn: "",
      fontLoaded: false
    };

    this.petStatus = "sadangry";
    this.next = this.next.bind(this);
    Vibration.vibrate(1000);

    setInterval(() => {
      let rand = Math.round(Math.random());

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
    }, 5000);

    setInterval(() => {
      console.log('insideSetInterval')
      if (this.state.points > 0) {
        this.setState(prevState => {
          console.log("points", pointsToPetStatusMap[prevState.petAnimation]);
          return {
            points:
              this.state.points + pointsToPetStatusMap[prevState.petAnimation]
          };
        });
      } else {
        this.setState({ points: 0 });
      }
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
      this.setState({ timeScreenOn: Date.now() });
      const { timeScreenOn, timeScreenOut } = this.state;
      setTimestamp(timeScreenOut, timeScreenOn);
      getPetStatus().then(petStatus => {
        console.log("petStatus", petStatus);
        const animationState = calculatePetAnimation(petStatus);
        console.log("animationState", animationState);
        this.setState({ petAnimation: animationState });
      });
    } else if (
      this.state.appState.match(/active/) &&
      nextAppState === "background"
    ) {
      this.setState({ timeScreenOut: Date.now() });
    }

    this.setState({ appState: nextAppState });
  };

  _onLogout() {
    const { fontLoaded } = this.state;
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
    if (status == "happy") {
      return "Happy 😄";
    } else if (status == "neutral") {
      return "Feeling OK 😌";
    } else if (status == "sadangry") {
      return "Feeling angry! 😡";
    } else if (status == "angryhappy") {
      return "Feeling overwhelmed 😖 ";
    } else {
      return "Feeling sad 😔";
    }
  }

  next() {
    setTimeout(() => {
      this.setState(prevState => ({
        index:
          (this.state.index + 1) % petState[`${prevState.petAnimation}`].length
      }));
      this.next();
    }, 300);
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
          <Text style={{ fontSize: 24, marginBottom: 15, color: "white" }}>
            Turn Off Screen!
          </Text>
          <TouchableHighlight onPress={this._onLogout}>
            <Image
              source={require("./assets/logout.png")}
              style={{ right: 0 }}
              onPress={this._onLogout}
            />
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

              {this.state.points >= 0 ? this.state.points : 0}
            </Text>
          ) : null}
          <Image
            source={petState[`${this.state.petAnimation}`][this.state.index]}
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
            {this._convertStatus(this.state.petAnimation)}
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
  backdrop: {
    width:'100%',
    height:'100%'
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  petContainer: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center"
  }
});

//export default HomeScreen;
