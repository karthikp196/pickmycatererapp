import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Login'
import Orders from './components/Orders'

const { Navigator, Screen } = createStackNavigator();



const HomeNavigator = () => (
  <Navigator headerMode='none'>
    <Screen name='Home' component={Login}/>
    <Screen name='Details' component={Orders}/>
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator/>
  </NavigationContainer>
);