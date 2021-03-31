import React,{Component,useEffect, useState} from 'react';
import { StyleSheet,  View,Image,StatusBar } from 'react-native';
import { ListItem, Avatar ,Text} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from './Header';
import Login from './Login'
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import { Button,Input,Divider   } from 'react-native-elements';
import OrderDetail from './OrderDetail';
import 'react-native-gesture-handler';
import { NavigationContainer,useNavigation  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  Topnav  from './Topnav';

const Usertoken = async () => {
    try {
        token = await AsyncStorage.getItem('usertoken');
        //alert(token);
        console.log(token);
    } catch (error) {
      console.log("unable to fetch usertoken")
    }
  };

  
  class Processedorders extends Component {

    state = { orders:[], error:'' };

    componentDidMount() {
        fetch('http://menu.pickmycaterer.com/apivendor/processorderapi',{
            method: 'POST',
            header:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"vendor_email":token})
        })
        .then((response) => response.json())
        .then((res) => {

            if(res.is_error == 1)
            {
                this.setState({
                    isLoading: false,
                    orders: {"message":"No orders found"},
                    error : "1"
                  });
                  console.log(this.state.orders)
                  console.log(token)
            }
            else
            {
            this.setState({
                isLoading: false,
                orders: res,
                error : "0"
              });
              console.log(this.state.orders)
              console.log(token)
            }
             
            // this.setState({orders:res})
            // alert(res[1].order_token)   
        })
        .catch(function(error) {
          alert('There has been a problem with your fetch operation: ' + error.message);
          console('There has been a problem with your fetch operation: ' + error.message);
           // ADD THIS THROW error
            throw error;
          });
    }


    
    
	render(){
    //    
           

    const Logout = () => {
   
        AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        .then(() => alert("key is removed"))
        this.props.navigation.navigate('Login')
        
    }

    const Orderinner = () => {
        this.props.navigation.navigate('orders')
    }
    
            if(this.state.error == "1")
            {
                return (
               
                    <View style={styles.bodystyle}>
                        <StatusBar
                        backgroundColor="white"
                        barStyle="dark-content"
                        />
                        <Header headertitle="Orders" />
                        <View>
                     
                        <Text style={styles.txtstl} h4>No Orders Found</Text>
                        <Button title="logout"  onPress={Logout} />
                        </View>
                        
                    </View>
                )
            }
            else
            {
                return (
               
                    <View style={styles.bodystyle}>
                        <StatusBar
                        backgroundColor="white"
                        barStyle="dark-content"
                        />
                        <Header headertitle="Processed Orders" />
                        <View style = {styles.container}>
                            <View style = {styles.redbox}>
                                <Button buttonStyle={styles.btn1} type="outline" title="New Orders" onPress={() => this.props.navigation.navigate('Home')}></Button>
                            </View>
                            <View style = {styles.bluebox}>
                                <Button    title="Processed Orders"  ></Button>
                            </View>
                        </View>
                        {
                            this.state.orders.map((l, i) => (
                            <ListItem key={i} containerStyle={styles.Containstyle} bottomDivider >
                               <Avatar source={{uri:"http://pickmycaterer.com/wp-content/uploads/2021/02/logo5.png"}} />
                                <ListItem.Content>
                                <ListItem.Title style={styles.listmain}>{l.order_token}</ListItem.Title>
                                <ListItem.Subtitle style={styles.listsub}>{"processed"}</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Chevron />
                            </ListItem>
                            ))
                        }
                        <View>
                        
                        </View>

                      
                    </View>
                )
            }
           
        }
}


const styles = StyleSheet.create({
 bodystyle: {
    backgroundColor:'#EEEEEE',
    height:'100%'
 },
 listmain: {
    fontWeight:'bold'
 },
 listsub: {
    color:'white',
    padding:1,
    backgroundColor:'green',
    borderRadius:5,
    width:100,
    textAlign:'center',
    marginTop:4,
    fontSize:13
 },
 txtstl : {
    textAlign:'center',
    margin:10
 },

 
 container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width:"97%",
    marginLeft:"1.5%"
 },
 redbox: {
    width: "48%",
    height: 50,
    margin:5
   
 },
 bluebox: {
    width: "48%",
    height: 50,
    margin:5
   
 },
 btn1: {
     backgroundColor:'transparent',
     color:'black'
     
 },
 Containstyle: {
    //     shadowColor: '#000',
    //    shadowOffset: { width: 0, height: 1 },
    //    shadowOpacity: 0.8,
    //    shadowRadius: 2,  
    //    elevation: 5,
    //    margin:5,
    //    width:'95%',
    //    marginLeft:9,
    //    borderRadius:3,
 }   
});

export default Processedorders
