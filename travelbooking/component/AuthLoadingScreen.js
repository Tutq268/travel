import React,{useEffect} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import {scaledSize} from './../config/nomalize'

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
            {/* <TouchableOpacity 
                style={{marginBottom: 16}}
                activeOpacity={0.5} onPress={() => navigation.navigate("Auth")}>
                <Text style={{fontSize: 20,fontWeight:"500"}}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("SignUp")}>
                <Text style={{fontSize: 20,fontWeight:"500"}}>Sign Up</Text>
            </TouchableOpacity> */}
            <Image 
                source={require("./../assets/logo.png")}
            />
        </View>
    )
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#F2F1DF"
    }
})

export default AuthLoadingScreen