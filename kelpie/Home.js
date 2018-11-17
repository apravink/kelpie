import React from 'react';
import { AppRegistry, Image, StyleSheet, Text, View } from 'react-native';



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
export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.state = {index: 0};
    this.petStatus = 'alive';
}

componentDidMount() {
  
  this.next();
}

swapPet() {
}

next() {
  setTimeout(() => {
      this.setState({index: (this.state.index+1)%3});
      this.next();
  }, 450);
}

  render() {
    
    return (
      <View style={styles.container}>
                    <Image
              source={petState[`${this.petStatus}`][this.state.index]}
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
    width: 300, height: 300,
    justifyContent: 'center'
  }
});

//export default HomeScreen;