import React from 'react'
import { Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'

import WordScreen from './../component/WorkScreen'
import AddWordScreen from './../component/AddWordScreen'
import NotificationScreen from './../component/NotificationScreen'
import ManagerScreen from './../component/ManagerScreen'
import AddTravel from './../common/AddTravel/AddTravel'
import AddUserToTour from './../common/AddTravel/AddUserToTour'
import Icon from 'react-native-vector-icons/Ionicons'
import * as ScreenName from './../constant/ScreenName'
import TabbarIcon from './../common/TabbarIcon'


const Word = createStackNavigator({
    Word: WordScreen,
})

Word.navigationOptions = ({navigation}) =>{
    return{
        tabBarLabel : "Word",
        tabBarIcon: ({ focused }) => (
            <TabbarIcon
              focused={focused}
              name={'home'}
            />
          ),
    }
}

const AddWord = createStackNavigator({
    AddWord: AddWordScreen,
    [ScreenName.ADD_TRAVEL] : AddTravel,
    [ScreenName.ADD_USER_TO_TOUR] : AddUserToTour
})

AddWord.navigationOptions = ({navigation}) =>{
    return{
        tabBarLabel : "AddWord",
        tabBarIcon: ({ focused }) => (
            <TabbarIcon
              focused={focused}
              name={'briefcase'}
            />
          )
    }
}

const Notification = createStackNavigator({
    Notification: NotificationScreen
})

Notification.navigationOptions = ({navigation}) =>{
    return{
        tabBarLabel : "Notification",
        tabBarIcon: ({ focused }) => (
            <TabbarIcon
              focused={focused}
              name={'notifications'}
            />
          ),
    }
}

const Manager = createStackNavigator({
    Manager: ManagerScreen
})

Manager.navigationOptions = ({navigation}) =>{
    return{
        tabBarLabel : "Manager",
        tabBarIcon: ({ focused }) => (
            <TabbarIcon
              focused={focused}
              name={'person'}
            />
          ),
    }
}

export default createBottomTabNavigator({
    Word,
    AddWord,
    Notification,
    Manager
},{
    tabBarOptions :{
        showLabel: (Platform.OS !== 'android'),
        labelStyle: {
            fontSize: 10,
            marginTop: 10,
          },
          tabStyle: {
            backgroundColor: '#fcfcfc',
          },
          showIcon: true,
          renderIndicator: () => null,
          pressOpacity: 1,
          activeTintColor: "red",
          showLabel: false,
          inactiveTintColor: 'white',
    },
    initialRouteName: 'Word',
    tabBarPosition: 'bottom',
})