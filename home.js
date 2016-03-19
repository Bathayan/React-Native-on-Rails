'use strict';
import React, {
  Component,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  AsyncStorage,
  Text,
  View
} from 'react-native';

const ACCESS_TOKEN = 'access_token';

class Home extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoggenIn: "",
      showProgress: false,
      accessToken: this.getToken(),
    }
  }
  getToken(){
    AsyncStorage.getItem(ACCESS_TOKEN, (err,val)=> {
      if(err){
        throw err;
      }
      if(!val){
        this.redirect('login');
      }
      this.setState({accessToken: val})
    }).catch((err)=> {
        console.log("Something went wrong");
        this.redirect('login');
    });
  }
  deleteToken(){
    AsyncStorage.removeItem(ACCESS_TOKEN, (err,val)=> {
      if(err){
        throw err;
      }
      this.redirect('root');
    }).catch((err)=> {
        console.log("Something went wrong");
    });
  }
  redirect(routeName){
    this.props.navigator.push({
      name: routeName
    });
  }
  onLogout(){
    this.setState({showProgress: true})
    this.deleteToken();
  }
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.title}> Welcome New User </Text>
        <Text> Your new token is {this.state.accessToken} </Text>
        <TouchableHighlight onPress={this.onLogout.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Logout
          </Text>
        </TouchableHighlight>

        <ActivityIndicatorIOS animating={this.state.showProgress} size="large" style={styles.loader} />
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
  title: {
    fontSize: 25,
    marginBottom: 15
  },
  button: {
    height: 50,
    backgroundColor: 'red',
    alignSelf: 'stretch',
    marginTop: 80,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  loader: {
    marginTop: 20
  }
});

export default Home
