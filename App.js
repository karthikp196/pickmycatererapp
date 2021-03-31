
import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button,Input  } from 'react-native-elements';
import Login from './components/Login';
import Orders from './components/Orders'
import OrderDetail from './components/OrderDetail';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Signin from './components/Signin'
import Routes from './Routes';
import Route from './Route'



const Stack = createStackNavigator();



class App extends React.Component {
  render() {
    return (
      <Route />
    );
  }
}




// ...

export default App;