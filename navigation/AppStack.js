import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import React from 'react'
import Attendance from '../Components/Attendance';
import HomeScreen from '../Components/HomeScreen';
import Grades from '../Components/Grades';
import Search from '../Components/Search';
import CGPA from '../Components/CGPA';

const Tab = createMaterialBottomTabNavigator();

export default function AppStack() {
  return (
    <Tab.Navigator labeled={true} barStyle={{ backgroundColor: "white" }} activeColor="black" initialRouteName="Home" >
      <Tab.Screen name="Home1" component={HomeScreen} options={{ tabBarIcon: "home" }} ></Tab.Screen>
      <Tab.Screen name="Attendance" component={Attendance} options={{ tabBarIcon: "home" }} ></Tab.Screen>
      {/* <Tab.Screen name="Social" component={Search} options={{ tabBarIcon: "magnify" }} ></Tab.Screen> */}
      <Tab.Screen name="Grades" component={Grades} options={{ tabBarIcon: "file" }} ></Tab.Screen>
      <Tab.Screen name="CGPA" component={CGPA} options={{ tabBarIcon: "table" }} ></Tab.Screen>
    </Tab.Navigator>
  )
}
