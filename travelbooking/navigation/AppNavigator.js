import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import MainTabNavigation from './MainTabNavigation'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const AppStack = createSwitchNavigator({
    Main: MainTabNavigation
})

const RootStack = createStackNavigator({
  App: AppStack 
},{
  headerMode: "none"
})

export default createAppContainer(RootStack)
