import React , {useEffect, useState} from 'react';
import Home from './components/Orders';
import Login from './components/Login';
import OrderDetail from './components/OrderDetail';
import Sendquote from './components/Sendquote';
import Processedorders from './components/Processedorders'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, HeaderBackButton } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ActivityIndicator , View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const SettingsStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Route = () => {

    const [userToken, setUserToken] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function setToken() {
        try {
          token = await AsyncStorage.getItem('usertoken');
          //alert(token);
          console.log(token);
          setUserToken(token);
          setLoading(false);
        } catch(e) {
          console.log(e);
        }
      }  
      setToken();
    }, []);

  
    return (
      <NavigationContainer>
       
         { userToken == null ? (
          <SettingsStack.Navigator screenOptions={{
            headerShown: false,
          }}>
          <SettingsStack.Screen name="Login" component={Login} />
          <SettingsStack.Screen name="Home" component={Home}/>
          <SettingsStack.Screen name="orders" component={OrderDetail}/>  
          <SettingsStack.Screen name="sendquote" component={Sendquote}/> 
          <SettingsStack.Screen name="Processedorders" component={Processedorders}/> 
          </SettingsStack.Navigator> ):

          <SettingsStack.Navigator screenOptions={{headerShown: false,}}>
          <SettingsStack.Screen name="Home" component={Home} />
          <SettingsStack.Screen name="orders" component={OrderDetail}/>  
          <SettingsStack.Screen name="sendquote" component={Sendquote}/> 
          <SettingsStack.Screen name="Processedorders" component={Processedorders}/> 
          <SettingsStack.Screen name="Login" component={Login} />
          </SettingsStack.Navigator>
        }
         
          
  
      </NavigationContainer>
  );
};
export default Route;