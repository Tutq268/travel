import React from 'react'
import {View,Text,StyleSheet,SafeAreaView,TextInput,TouchableOpacity} from 'react-native'
import SiteMap from './../common/SiteMap'

const SignInScreen = ({navigation}) =>{
    return (
        <SafeAreaView style={styles.container}>
            <View style={{padding: 32,flex: 1}}>
               <Text style={{fontSize: 32,fontWeight: 'bold',marginTop: 32}}>Login</Text>
               <View style={{flex: 1, justifyContent: 'center'}}>
                   <View style={{marginBottom: 38}}>
                    <Text style={{color: "grey",fontSize: 15}}>Username</Text>
                        <TextInput
                            style={{height: 32,borderBottomColor: 'grey',borderBottomWidth: StyleSheet.hairlineWidth}}
                        />
                   </View>
                  
                   <View>
                    <Text style={{color: "grey",fontSize: 15}}>Password</Text>
                        <TextInput
                            style={{height: 32,borderBottomColor: 'grey',borderBottomWidth: StyleSheet.hairlineWidth}}
                        />
                   </View>

                    <TouchableOpacity 
                        style={{borderRadius: 8,marginTop: 32,width: '100%',height: 46,backgroundColor: "#4EC1E2",alignItems:'center',justifyContent:"center"}}
                        onPress = {() => SiteMap.showScreen(navigation,"App")}
                        >
                            <Text style={{fontWeight: "bold",color: "#fff",fontSize: 20}}>
                                Login
                            </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{width: '100%',alignItems:'center',marginTop: 16}}
                        onPress={() => SiteMap.showScreen(navigation,"SignUp")}
                        >
                            <Text style={{color: 'grey',fontSize: 16}}>Don't have account? Sign Up!</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{width: '100%',alignItems:'center',marginTop: 16}}>
                            <Text style={{color: 'grey',fontSize: 15,textDecorationLine:"underline"}}>Forgot your password?</Text>
                    </TouchableOpacity>
                   
               </View>
            </View>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container :{
        flex: 1
    }
})

export default SignInScreen