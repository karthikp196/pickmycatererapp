import React,{useEffect, useState} from 'react'
import { Router, Scene,Actions } from 'react-native-router-flux'
import Login from './components/Login'
import Order from './components/Orders'
import OrderDetail from './components/OrderDetail'
import AsyncStorage from '@react-native-community/async-storage';

const Routes = () => {
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
 
   
   if (userToken == "") {
      Actions.login();
    } else {
      Actions.order();
   }

   return(
      
      <Router>
      <Scene key = "root">
            
            <Scene key = "login" component = {Login} title = "Home" initial = {true} hideNavBar={true} />
            <Scene key = "order" component = {Order} title = "Orders" hideNavBar={true}/>
            <Scene key = "OrderDetails" component = {OrderDetail} title = "OrderDetails" />
         </Scene>
       </Router>
   )
  
}
export default Routes