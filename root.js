'use strict';
import React, {
  Component,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  Text,
  View
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

class Root extends Component {
  constructor(){
    super();
    this.state = {
      accessToken: ""
    }
  }
  componentWillMount() {
    this.getToken();
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
        console.log("Token not set")
      } else {
        this.setState({accessToken: accessToken})
        this.verifyToken()
      }
    }).catch((err)=> {
        console.log("Something went wrong");
    });
  }
  //If token is verified we will redirect the user to the home page
  verifyToken() {
    let accessToken = this.state.accessToken;
    fetch('http://localhost:3000/verify.json?session%5Baccess_token%5D='+accessToken)
    .then((response) => {
      console.log("verified? " + response._bodyText)
      if (response.status >= 200 && response.status < 300) {
        return response.text();
      } else {
        let error = response;
        throw error;
      }
    })
    .then((responseData) => {
      console.log(responseData);
      this.navigate('home');
    })
    .catch((errors) => {
      return errors.text();
    })
    then((errors) => {
      console.log("error response: " + errors);
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome Friend {this.state.isLoggenIn}</Text>
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
