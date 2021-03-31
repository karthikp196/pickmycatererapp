import React,{ Component } from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button,Input  } from 'react-native-elements';
import SvgUri from 'react-native-svg-uri';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Orders from './Orders'
import {
    AppRegistry
  } from 'react-native';



  class Login extends Component {

    state = {
        email: '',
        password: ''
    };


	render(){

       

        const goToorder = () => {

            var email = this.state.email;
            var password = this.state.password;
            var dataObj = {}
            dataObj.vendoremail = email,
            dataObj.vendor_password = password

            fetch('http://menu.pickmycaterer.com/apivendor/',{
                method: 'POST',
                header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataObj)
            })
            .then((response) => response.json())
            .then((res) => {
                
                if (res.is_error == 0){
                    var vendor_id = res.id;
                    storeToken(email);
                    this.props.navigation.navigate('Home');
    
                }else{
                    alert("Invalid Credentials")
                }
    
              
            })
            .catch(function(error) {
              alert('There has been a problem with your fetch operation: ' + error.message);
               // ADD THIS THROW error
                throw error;
              });
       
         
        }

        const storeToken = async (email) => {
          try 
            {
               await AsyncStorage.setItem("usertoken", email);
               const value = await AsyncStorage.getItem('usertoken')
               console.log(value);

            } 
            catch (error) 
            {
              console.log("Something went wrong", error);
            }
        }


     
        return (
            <View>
            <View style={styles.sectionContainer}>
            <View style={styles.Imagesection}>
                <Image source={{uri: 'http://pickmycaterer.com/wp-content/uploads/2021/02/log1.png'}}
                style={styles.Responsive} />
            
            </View>
            <View style={styles.Formsection}>
                <Input placeholder='' label="Email" onChangeText={(value) => this.setState({email: value})}  leftIcon={{ type: 'font-awesome', name: 'user' }} />
                <Input placeholder="" secureTextEntry={true} label="Password" onChangeText={(value) => this.setState({password: value})} leftIcon={{ type: 'font-awesome', name: 'lock' }} />
                <Button   title="Login" onPress={goToorder} />
            </View>
            </View>
        </View>
        )
    }
}



const styles = StyleSheet.create({
    scrollView: {
      
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
    
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize:30,
      fontWeight: '900',
      padding:10
    },
    Formsection: {
      marginTop:50,
    },
    Responsive: {
      width:340,
      height:60,
      
    },
    Imagesection: {
      marginTop:150
    },
    BtnStyle: {
        backgroundColor:'#faad42',
    }
  });

export default Login
