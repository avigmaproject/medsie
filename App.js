import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {Root} from 'native-base';

import store from './source/redux/store';

import MainStackNavigator from './source/navigation/main-stack-navigator/main-stack-navigator.navigation';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <NavigationContainer>
            <MainStackNavigator />
          </NavigationContainer>
        </Root>
      </Provider>
    );
  }
}

export default App;
