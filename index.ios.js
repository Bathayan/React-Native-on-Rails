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
import Root from './root';

class ReactNativeRailsAuth extends Component {
  constructor(){
    super();

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
    if(route.name == 'root') {
      return <Root navigator={navigator} />
    }
    if(route.name == 'register') {
      return <Register navigator={navigator} />
    }
    if(route.name == 'login') {
      return <Login navigator={navigator} />
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={{name: 'root'}}
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
});

AppRegistry.registerComponent('ReactNativeRailsAuth', () => ReactNativeRailsAuth);
