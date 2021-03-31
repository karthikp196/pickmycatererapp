import React,{Component} from 'react';
import { StyleSheet, Text, View,Image,StatusBar,ScrollView } from 'react-native';
import { ListItem, Avatar, Icon,Overlay  } from 'react-native-elements';
import Header from './Header';
import { Button,Input  } from 'react-native-elements';

const list = [
    {
      name: 'Paneer Tikka',
      avatar_url: 'http://menu.pickmycaterer.com/media/southindian.jpg',
      subtitle: 'North Indian'
    },
    {
      name: 'Idly',
      avatar_url: 'http://menu.pickmycaterer.com/media/southindian.jpg',
      subtitle: 'South Indian'
    },
    {
        name: 'Idly',
        avatar_url: 'http://menu.pickmycaterer.com/media/southindian.jpg',
        subtitle: 'South Indian'
      },
      {
        name: 'Idly',
        avatar_url: 'http://menu.pickmycaterer.com/media/southindian.jpg',
        subtitle: 'South Indian'
      },
     
  
]


class OrderDetail extends Component {

    
    state = { orders:[], error:'' ,address:'',event_date:'',city:'',postalcode:'', no_of_people:'',order_details:[],price:'',description:'' };

    componentDidMount() {

        
        fetch('http://menu.pickmycaterer.com/apivendor/orderdetailsapi',{
            method: 'POST',
            header:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"order_token":this.props.route.params.Order_token})
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
                  
            }
            else
            {
            this.setState({
                isLoading: false,
                orders: res,
                error : "0",
              });
              console.log(this.state.orders)
              
            }

            this.setState({ address :this.state.orders[0].address  })
            this.setState({ no_of_people :this.state.orders[0].no_of_people  })
            this.setState({ event_date :this.state.orders[0].event_date  })
            this.setState({ city :this.state.orders[0].city  })
            this.setState({ postalcode :this.state.orders[0].postalcode  })
             
            // this.setState({orders:res})
            // alert(res[1].order_token)   
        })
        .catch(function(error) {
          alert('There has been a problem with your fetch operation: ' + error.message);
          console('There has been a problem with your fetch operation: ' + error.message);
           // ADD THIS THROW error
            throw error;
          });


        //   Getting food json response

        fetch('http://3.7.4.24/api_fetch/api.php',{
            method: 'POST',
            header:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({order_token:this.props.route.params.Order_token}),
        })
        .then((response) => response.json())
        .then((resjson) => {
            this.setState({
                isLoading: false,
                order_details: resjson,
               
              });
              console.log("KLSAJDLASKJD")
              console.log(this.state.order_details)
             
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

        const sendquote = () => {
            alert("hey")
        }
        
       
        
        return (
            <ScrollView>
            <View>
                <StatusBar
                backgroundColor="white"
                barStyle="dark-content"
                />

                 <Header headertitle="Order Details" />
                
                <View style={styles.containercont}>
                    <Text style={styles.containertext} h3>{this.props.route.params.Order_token}</Text>
                    <Text style={styles.containertextreg}>No Of People: {this.state.no_of_people} </Text>
                    <Text style={styles.containertextreg}>Event Date: {this.state.event_date}</Text>
                    <Text style={styles.containertextreg}>{this.state.address}</Text>
                    <Text style={styles.containertextreg}>{this.state.city}</Text>
                    <Text style={styles.containertextreg}>{this.state.postalcode}</Text>
                    <View style={styles.absolutecont}>
                        <Text style={styles.listsub}>New</Text>
                    </View>
                </View>
               
                <View style={styles.containercont}>
                {
                    
                    this.state.order_details.map((l, i) => (
                        <ListItem key={i} bottomDivider>
                            <Avatar source={{uri: "http://menu.pickmycaterer.com/"+l.dish_image}} />
                            <ListItem.Content>
                            <ListItem.Title>{l.dish_name}</ListItem.Title>
                            
                            </ListItem.Content>
                        </ListItem>
                        
                        ))
                    
                }   
                </View>
                <View style={styles.containercont1}>
                        <Button  buttonStyle={styles.BtnStyle} title="Give a Quotation" onPress={() => this.props.navigation.navigate('sendquote', {
                                Order_token: this.props.route.params.Order_token,
                              })} />
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

export default OrderDetail
