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

class Login extends Component {
  constructor(){
    super();

    this.state = {
      email: "",
      password: "",
      isLoggenIn: "",
      errors: null,
      showProgress: false,
    }
  }
  redirect(routeName){
    this.props.navigator.push({
      name: routeName
    });
  }
  onRegisterPressed(){
    this.setState({showProgress: true})
    fetch('http://localhost:3000/login.json', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session:{
          email: this.state.email,
          password: this.state.password,
        }
      })
    })
    .then((response) => {
      this.setState({showProgress: false})
      if (response.status >= 200 && response.status < 300) {
        return response.text();
      } else {
        throw error;
      }
    })
    .then((responseData) => {
      console.log(responseData);
      this.setState({isLoggenIn: "Welcome Brother", errors: null})
      AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err,val)=> {
        if(err){
          console.log("an error");
          throw err;
        }
      }).catch((err)=> {
          cosole.log("error is: " + err);
      });
    })
    .catch((errors) => {
      //this.redirect('root');
      this.setState({errors: "Email and password combination are invalid"})
    });
  }
  render() {
    //We want to check if their are any errors to show in the view.
    AsyncStorage.getItem(ACCESS_TOKEN, (err,val)=> {
      if(err){
        console.log("an error");
        throw err;
      }
      console.log("The token is: " + val);
    }).catch((err)=> {
        console.log("error is: " + err);
    });

    let formErrors;
    if (this.state.errors) {
       formErrors = <Errors errors={this.state.errors}/>
    } else {
       formErrors = null
    }
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>
          Native on Rails
        </Text>
        <TextInput
          onChangeText={ (text)=> this.setState({email: text}) }
          style={styles.input} placeholder="Email">
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password: text}) }
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}>
        </TextInput>
        <TouchableHighlight onPress={this.onRegisterPressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableHighlight>
        <Text style={styles.success}>{this.state.isLoggenIn}</Text>
        {formErrors}

        <ActivityIndicatorIOS animating={this.state.showProgress} size="large" style={styles.loader} />
      </View>
    );
  }
}

const Errors = (props) => {
  return (
    <View>
      <Text style={styles.error}>{props.errors}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 80
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  heading: {
    fontSize: 30,
  },
  error: {
    color: 'red',
    paddingTop: 10
  },
  success: {
    color: 'green',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});

export default Login
