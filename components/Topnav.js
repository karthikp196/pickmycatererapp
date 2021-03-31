import React,{Component,useEffect, useState} from 'react';
import { StyleSheet,  View,Image,StatusBar } from 'react-native';
import { ListItem, Avatar ,Text,Button} from 'react-native-elements';



  
  class Topnav extends Component {

 
	render(){
        return(
            <View style = {styles.container}>
                <View style = {styles.redbox}>
                    <Button title="New Orders" ></Button>
                </View>
                <View style = {styles.bluebox}>
                    <Button buttonStyle={styles.btn1}  onPress={() => this.props.navigation.navigate('Processedorders')} title="Processed Orders" type="outline" ></Button>
                </View>
            </View>
        )   
        }
}



const styles = StyleSheet.create({
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
         
     }
    
});

export default Topnav
