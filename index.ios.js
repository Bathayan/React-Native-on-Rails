/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ListView,
  Text,
  View
} from 'react-native';

class ReactNativeRailsAuth extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
      errors: null
    }
  }
  onRegisterPressed(){
    fetch('http://localhost:3000/users.json', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user:{
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password_confirmation: this.state.password_confirmation,
        }
      })
    })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.text();
      } else {
        let error = JSON.parse(response._bodyInit);
        error.response = JSON.parse(response._bodyInit);
        throw error;
      }
    })
    .then((responseData) => {
      console.log(responseData);
    })
    .catch((errors) => {
      console.log(errors);

      let errorsArray = [];
      for(var key in errors) {
        //If array is bigger than one we need to split it.
        if(errors[key].length > 1 && key != "response") {
          errors[key].map(error => errorsArray.push(key + " " + error));
        } else if(key != "response") {
          errorsArray.push(key + " " + errors[key]);
        }
      }
      this.setState({errors: errorsArray})
    });
  }
  render() {
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
          onChangeText={ (text)=> this.setState({name: text}) }
          style={styles.input} placeholder="Name">
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password: text}) }
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}>
        </TextInput>
        <TextInput
          onChangeText={ (text)=> this.setState({password_confirmation: text}) }
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry={true}>
        </TextInput>
        <TouchableHighlight onPress={this.onRegisterPressed.bind(this)} style={styles.button}>
          <Text style={styles.buttonText}>
            Register
          </Text>
        </TouchableHighlight>

        {formErrors}


      </View>
    );
  }
}

const Errors = (props) => {
  return (
    <View>
      {props.errors.map((error, i) => <Text key={i}> {error} </Text>)}
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
});

AppRegistry.registerComponent('ReactNativeRailsAuth', () => ReactNativeRailsAuth);
