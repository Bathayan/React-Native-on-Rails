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
  ActivityIndicatorIOS,
  Navigator,
  Text,
  View
} from 'react-native';

import Login from './login';
import Register from './register';

// <Navigator
//   initialRoute={{name: 'register', index: 0}, {name: 'login', index: 1}}
//   renderScene={(route, navigator) =>
//     <Register
//       name={route.name}
//       onForward={() => {
//         var nextIndex = route.index + 1;
//         navigator.push({
//           name: 'Scene ' + nextIndex,
//           index: nextIndex,
//           component: Login
//         });
//       }}
//       onBack={() => {
//         if (route.index > 0) {
//           navigator.pop();
//         }
//       }}
//     />


class ReactNativeRailsAuth extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: "",
      name: "",
      password: "",
      password_confirmation: "",
      errors: null,
      showProgress: false
    }
  }

  renderScene(route, navigator) {
    console.log(route);
    switch (route.name) {
      case 'Login':
        return(
          <Login
          name={route.name}
          onForward={() => {
            var nextIndex = route.index + 1;
            navigator.push({
              name: 'Scene ' + nextIndex,
              index: nextIndex,
              component: Login
            });
          }}
          onBack={() => {
            if (route.index > 0) {
              navigator.pop();
            }
          }}
          />
        );
      default:
        return (
            <Register
            name={route.name}
            onForward={() => {
              var nextIndex = route.index + 1;
              navigator.push({
                name: 'Login',
              });
            }}
            onBack={() => {
              if (route.index > 0) {
                navigator.pop();
              }
            }}
          />
        );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{name: 'register', index: 0}}
          renderScene={this.renderScene.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
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
  loader: {
    marginTop: 20
  }
});

AppRegistry.registerComponent('ReactNativeRailsAuth', () => ReactNativeRailsAuth);
