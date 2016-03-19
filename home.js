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
      email: "",
      password: "",
      isLoggenIn: "",
      errors: null,
      showProgress: false,
      accessToken: this.props.accessToken
    }
  }
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.title}> Welcome New User </Text>
        <Text> Your new token is {this.props.accessToken} </Text>
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
  }
});

export default Home
