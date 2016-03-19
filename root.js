'use strict';
import React, {
  Component,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  AsyncStorage,
  Navigator,
  Text,
  View
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

class Root extends Component {
  constructor(){
    super();
    this.state = {
      isLoggenIn: "",
      accessToken: this.getToken()
    }
  }
  navigate(routeName) {
    this.props.navigator.push({
      name: routeName
    });
  }
  getToken(){
    AsyncStorage.getItem(ACCESS_TOKEN, (err,accessToken)=> {
      if(err){
        throw err;
      }
      if(!accessToken){

      }
      this.setState({accessToken: accessToken})
      this.verifyToken()
    }).catch((err)=> {
        console.log("Something went wrong");
    });
  }
  verifyToken() {
    let accessToken = this.state.accessToken;
    fetch('http://localhost:3000/verify.json?session%5Baccess_token%5D='+accessToken)
    .then((response) => {
      console.log("verified? " + response._bodyText)
      if (response.status >= 200 && response.status < 300) {
        return response._bodyText;
      } else {
        let error = new Error(response.status);
        error.response = response._bodyText;
        throw error;
      }
    })
    .then((responseData) => {
      console.log(responseData);
      this.navigate('home');
    })
    .catch((errors) => {
      console.log("error response: " + errors.response);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Friend {this.state.isLoggenIn}</Text>
        <Text>{this.state.accessToken}</Text>
        <TouchableHighlight onPress={ this.navigate.bind(this,'register') } style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={ this.navigate.bind(this, 'login') } style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 180
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  title: {
    fontSize: 25,
    marginBottom: 15
  }
});


export default Root
