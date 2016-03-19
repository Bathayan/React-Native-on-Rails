/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Navigator,
  Text,
  View
} from 'react-native';

import Login from './login';
import Register from './register';
import Root from './root';
import Home from './home';

class ReactNativeRailsAuth extends Component {
  constructor(){
    super();

    this.state = {
      isLoggenIn: false
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
      return <Login navigator={navigator}  txt="text sunny"/>
    }
    if(route.name == 'home') {
      return <Home navigator={navigator} {...route.passProps}/>
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
