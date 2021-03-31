import React,{Component} from 'react';
import { StyleSheet, Text, View,Image,StatusBar,ScrollView } from 'react-native';
import { ListItem, Avatar, Icon,Overlay  } from 'react-native-elements';
import Header from './Header';
import { Button,Input  } from 'react-native-elements';


const Usertoken = async () => {
    try {
        token = await AsyncStorage.getItem('usertoken');
        //alert(token);
        console.log(token);
    } catch (error) {
      console.log("unable to fetch usertoken")
    }
  };

class Sendquote extends Component {

    state = {
        price: '',
        comments: ''
    };
	render(){

        const sendquote = () => {
            var price = this.state.price;
            var comments = this.state.comments;
            var order_token = this.props.route.params.Order_token;
            var vendor_email = token;
            var dataObj = {}
            dataObj.price = price,
            dataObj.comments = comments,
            dataObj.order_token = order_token,
            dataObj.vendor_email = vendor_email

            fetch('http://menu.pickmycaterer.com/apivendor/sendquote',{
                method: 'POST',
                header:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataObj)
            })
            .then((response) => response.text())
            .then((res) => {
               
                this.props.navigation.navigate('Home');
            
              
            })
            .catch(function(error) {
              alert('There has been a problem with your fetch operation: ' + error.message);
               // ADD THIS THROW error
                throw error;
              });
            



        }
        
       
        
        return (
            <ScrollView>
            <View>
                <StatusBar
                backgroundColor="white"
                barStyle="dark-content"
                />

                 <Header headertitle="Give a Quotation" />
                 <View style={styles.containercont}>
                     <Input placeholder='Enter Price' onChangeText={(value) => this.setState({price: value})}/>
                     <Input placeholder='Enter Comments' onChangeText={(value) => this.setState({comments: value})}/>
                     <Button  buttonStyle={styles.BtnStyle} title="Give a Quotation" onPress={sendquote} />
                 </View>
              </View>
            </ScrollView>

        )
    }


}


const styles = StyleSheet.create({


    HeaderText: {
        fontSize:20,
        fontWeight:'600',
        textAlign:'center'
    },
    containercont1: {
        padding:20,
        margin:5,
      
        borderRadius:4,
        width:'92%',
        marginLeft:'4%',
        position:'relative',
    },
    containercont: {     
       padding:20,
       margin:5,
       shadowColor: "#000",
       shadowOffset: {
           width: 0,
           height: 2,
       },
       shadowOpacity: 0.25,
       shadowRadius: 3.84,
       elevation: 5,
       backgroundColor:'white',
       borderRadius:4,
       width:'92%',
       marginLeft:'4%',
       position:'relative',
       
    },
    containertext: {
        margin:5,
        fontWeight:'bold',
        fontSize:17,
        color:'#646970'
    },
    containertextreg: {
        margin:5,
        fontSize:16,
        color:'#646970'
    },
    listsub: {
        color:'white',
        padding:1,
        backgroundColor:'#4F91FE',
        borderRadius:5,
        width:50,
        textAlign:'center',
        marginTop:4,
        fontSize:13
     },
     absolutecont: {
        position:'absolute',
        right:10,
        top:20,
     },
     sectionContainer: {
        width:'92%',
       marginLeft:'4%',
       backgroundColor:'white',
       marginTop:30,
       
      },
      BtnStyle: {
       
      }
    
});

export default Sendquote
