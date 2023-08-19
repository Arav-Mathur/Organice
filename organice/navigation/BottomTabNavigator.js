import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import Kitchen from '../screens/Kitchen';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Tab = createMaterialBottomTabNavigator();

const MyTab = () => {
    return (
      <Tab.Navigator
        initialRouteName="Kitchen"
        activeColor="white"
        inactiveColor="#014f00"
        barStyle={{ backgroundColor: '#8fb913' }}>
        <Tab.Screen name="Kitchen" component={Kitchen} />
    
      </Tab.Navigator>
    );
  };
  
export { MyTab };


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
  },
});
  