import { React } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

//Screen
import HomeScreen from "./screens/HomeScreen";
import SettinsScreen from "./screens/SettinsScreen";
import StackScreen from "./screens/StackScreen";

const Tab =createBottomTabNavigator();

function MaTabs() {
    return(
        <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeScreen}></Tab.Screen>
            <Tab.Screen name='Settings' component={SettinsScreen}></Tab.Screen>
            <Tab.Screen name='Stack' component={StackScreen}></Tab.Screen>
        </Tab.Navigator>
    );
}

export default function Navigation(){
    return(
        <NavigationContainer>
            <MaTabs></MaTabs>
        </NavigationContainer>
        
    );
}