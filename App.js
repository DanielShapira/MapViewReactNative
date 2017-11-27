import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import MainScreen from './screens/MainScreen';

export default class App extends Component {
  render() {
    const Navigator = StackNavigator({
      Main: { screen: MainScreen },
    });  

     return <Navigator />;
  }
}
