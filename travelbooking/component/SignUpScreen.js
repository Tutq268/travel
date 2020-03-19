import React from 'react'
import {View,Text,StyleSheet,SafeAreaView,TextInput,TouchableOpacity} from 'react-native'
import SiteMap from './../common/SiteMap'
import Icon from 'react-native-vector-icons/Ionicons'

const SignUpScreen = ({navigation}) =>{
    return (
        <SafeAreaView style={styles.container}>
            <View style={{padding: 32,flex: 1}}>
            <Icon 
                    onPress={() => navigation.goBack()}
                    name="ios-arrow-round-back"
                    size={32}
                    color="grey"
                />
               <Text style={{fontSize: 32,fontWeight: 'bold',marginTop: 16}}>Sign Up</Text>
               <View style={{flex: 1, justifyContent: 'center'}}>
                   <View style={{marginBottom: 38}}>
                    <Text style={{color: "grey",fontSize: 15}}>Username</Text>
                        <TextInput
                            style={{height: 32,borderBottomColor: 'grey',borderBottomWidth: StyleSheet.hairlineWidth}}
                        />
                   </View>

                   <View style={{marginBottom: 38}}>
                    <Text style={{color: "grey",fontSize: 15}}>Phone number</Text>
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

                    <TouchableOpacity style={{borderRadius: 8,marginTop: 32,width: '100%',height: 46,backgroundColor: "#4EC1E2",alignItems:'center',justifyContent:"center"}}>
                            <Text style={{fontWeight: "bold",color: "#fff",fontSize: 20}}>
                                Sign Up
                            </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={{width: '100%',alignItems:'center',marginTop: 16}}
                        onPress={() => navigation.goBack()}
                        >
                            <Text style={{color: 'grey',fontSize: 16}}>Already account? Sign In!</Text>
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

export default SignUpScreen