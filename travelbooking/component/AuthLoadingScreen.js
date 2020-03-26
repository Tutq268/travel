import React,{useEffect} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

const AuthLoadingScreen = ({navigation}) =>{

    useEffect(() =>{
        const fetchData = async () =>{
            const token = await AsyncStorage.getItem("userToken")

            if(token){
                navigation.navigate("App")
            }else{
                navigation.navigate("Auth")
            }
        }
       fetchData()
    },[])

    return(
        <View style={styles.container}>
            <Text>My Tour</Text>
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default AuthLoadingScreen