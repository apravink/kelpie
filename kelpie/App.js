import React from 'react';
import { AppRegistry, Image, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.images = [
        require('./assets/pet-1.png'),
        require('./assets/pet-2.png'),
        require('./assets/pet-3.png'),
        require('./assets/pet-4.png'),
        require('./assets/pet-5.png'),
        require('./assets/pet-6.png'),
        require('./assets/pet-7.png'),
        require('./assets/pet-8.png'),
        require('./assets/pet-9.png'),
      ];
    this.next = this.next.bind(this);
    this.state = {index: 0};
}

componentDidMount() {
  this.next();
}

next() {
  setTimeout(() => {
      this.setState({index: (this.state.index+1)%3});
      this.next();
  }, 200);
}

  render() {
    return (
      <View style={styles.container}>
                    <Image
              source={this.images[this.state.index]}
              style={styles.image}
            />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300, 
    height: 300,
    justifyContent: 'center'
  }
});
