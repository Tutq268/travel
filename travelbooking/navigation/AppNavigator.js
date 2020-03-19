import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import MainTabNavigation from './MainTabNavigation'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SignInScreen from './../component/SignInScreen'
import SignUpScreen from './../component/SignUpScreen'

const AppStack = createSwitchNavigator({
    Main: MainTabNavigation
})

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen
},{
  initialRouteName: "SignIn",
  headerMode: 'none'
})

const RootStack = createStackNavigator({
  Auth:AuthStack,
  App: AppStack 
},{
  initialRouteName:'Auth',
  headerMode: "none"
})

export default createAppContainer(RootStack)
