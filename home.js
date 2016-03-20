'use strict';
import React, {
  Component,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
  AsyncStorage,
  AlertIOS,
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
      accessToken: "",
      flash: this.props.flash
    }
  }
  componentWillMount() {
    this.getToken();
  }
  getToken(){
    AsyncStorage.getItem(ACCESS_TOKEN, (err,accessToken)=> {
      if(err){
        throw err;
      }
      if(!accessToken){
        this.redirect('login');
      } else {
        this.setState({accessToken: accessToken})
      }
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
      name: routeName,
      passProps: {
        accessToken: this.state.accessToken
      }
    });
  }
  onLogout(){
    this.setState({showProgress: true})
    this.deleteToken();
  }
  confirmDelete() {
    AlertIOS.alert("Are you sure?", "This action cannot be undone", [
      {text: 'Cancel'}, {text: 'Delete', onPress: () => this.onDelete()}
    ]);
  }
  async onDelete(){
    let access_token = this.state.accessToken
    try {
      let response = await fetch('http://localhost:3000/api/users/'+access_token,{
                              method: 'DELETE',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              }
                            });
        let res = await response.text();
        if (response.status >= 200 && response.status < 300) {
          console.log("success sir: " + res)
          this.redirect('root');
        } else {
          let error = res;
          throw error;
        }
    } catch(error) {
      console.log("error: " + error)
    }
  }
  render() {
    let flashMessage;
    if (this.state.flash) {
       flashMessage = <FlashMessage flash={this.state.flash}/>
    } else {
       flashMessage = null
    }
    return(
      <View style={styles.container}>
        {flashMessage}
        <Text style={styles.title}> Welcome New User </Text>
        <Text style={styles.text}> Your new token is {this.state.accessToken} </Text>

        <TouchableHighlight onPress={this.onLogout.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Logout
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.redirect.bind(this, 'update')} style={styles.button}>
          <Text style={styles.buttonText}>
            Update Account
          </Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.confirmDelete.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Delete Account
          </Text>
        </TouchableHighlight>

        <ActivityIndicatorIOS animating={this.state.showProgress} size="large" style={styles.loader} />
      </View>
    );
  }
}

const FlashMessage = (props) => {
  return (
    <View>
      <Text style={styles.flash}>{props.flash}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  title: {
    fontSize: 25,
    marginTop: 15,
    marginBottom: 15
  },
  text: {
    marginBottom: 30
  },
  button: {
    height: 50,
    backgroundColor: 'red',
    alignSelf: 'stretch',
    marginTop: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  flash: {
    height: 40,
    backgroundColor: '#00ff00',
    padding: 10,
    alignSelf: 'center',
  },
  loader: {
    marginTop: 20
  }
});

export default Home
