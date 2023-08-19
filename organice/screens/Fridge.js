import * as React from 'react';
import { Text, View, StyleSheet, FlatList , TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';
import { ListItem } from '@rneui/themed';

const itemlist = [//temp
{name:"food1", qty:5, measure: "kg"},
{name:"food2", qty:6, measure: "ml"},
{name:"food3", qty:7, measure: "boxes"},
]

export default class Fridge extends React.Component {
 keyExtractor=(item,index)=>index.toString();

    renderItem=({item,i})=>{
        return(
            <ListItem bottomDivider>
                 <ListItem.Content>
                      <ListItem.Title style={{ color: "black", fontWeight: "bold" }}> 
                      {item.name}
                       </ListItem.Title>
                       <View style={{flexDirection:"row"}}>
                       <ListItem.Subtitle> 
                           {item.qty}
                      </ListItem.Subtitle>
                      <ListItem.Subtitle> 
                           {item.measure}
                      </ListItem.Subtitle>
                      </View>
                 </ListItem.Content>
                  <TouchableOpacity style={styles.button}
               onPress={() => { this.props.navigation.navigate('storage') }}
              > 
                    <Text style={{ color: '#ffff' }}>View</Text> 
                    </TouchableOpacity>
                     </ListItem>
        )
    }

  render(){
  

  return (
    <View style={styles.container}>
     <FlatList
  keyExtractor={this.keyExtractor}
  data= {itemlist}
  renderItem={this.renderItem}
            />
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },   button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#8fb913",
      shadowColor: "#014f00",
      shadowOffset: {
         width: 0,
         height: 8
       },
       borderRadius:5
}
});
