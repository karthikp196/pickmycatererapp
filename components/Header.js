import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';


const Header = ({headertitle}) => {
    return (
        <View style={styles.Headerview}>
            <Text style={styles.HeaderText}>{headertitle}</Text>
        </View>
    )
}



const styles = StyleSheet.create({
   Headerview: {
       height:50,
       textAlign:'center',
       backgroundColor:'white',
       marginBottom:10,
       display:'flex',
       alignItems:'center',
       justifyContent:'center',
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 1 },
       shadowOpacity: 0.8,
       shadowRadius: 2,  
       elevation: 5,
    
   },
   HeaderText: {
       fontSize:20,
       fontWeight:'600',
       textAlign:'center'
   }
  });

export default Header
