import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,SafeAreaView,TextInput,TouchableOpacity,ActivityIndicator} from 'react-native'
import { useDispatch,useSelector } from 'react-redux'
import {createAccount} from './../action/AuthAction'
import SiteMap from './../common/SiteMap'
import Icon from 'react-native-vector-icons/Ionicons'

const SignUpScreen = ({navigation}) =>{
    const [username,setUsername] = useState("")
    const [phonenumber,setPhoneNumber] = useState("")
    const [password,setPassword] = useState("")
    const [errInput,setErrInput] = useState([])
    const dispatch = useDispatch()
    const {isLoading,screenName} = useSelector(state => state.loading)
    const {statusSignUp} = useSelector(state => state.auth)
    const [errSignUp,setErrSignUp] = useState("")
    useEffect(() =>{
        if(statusSignUp){
            if(statusSignUp.status === "success"){
                navigation.goBack()
            }else{
                setErrSignUp(statusSignUp.message)
            }
        }
    },[statusSignUp])

    const SignUpAccount = () =>{
        const err = []
        if(username === ""){
            err.push("username")
        }
        if(phonenumber === ""){
            err.push("phonenumber")
        }
        if(password === ""){
            err.push("password")
        }
        if(err.length === 0){
            setUsername("")
            setPhoneNumber("")
            setPassword("")
            dispatch(createAccount(username,phonenumber,password))
        }else{
            setErrInput(err)
        }
    }
    const _renderErrorSignup = () =>{
        return(
            <View style={{marginBottom: 16,alignItems: 'center'}}>
                <Text style={{color: 'red',fontStyle:"italic"}}>{errSignUp}</Text>
            </View>
        )
    }
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
                   {errSignUp.status === "failed" && _renderErrorSignup()}
                   <View style={{marginBottom: 38}}>
                    <Text style={{color: errInput.includes("username") ? "red" : "grey",fontSize: 15}}>Username</Text>
                        <TextInput
                            value={username}
                            onChangeText={text => setUsername(text)}
                            style={{height: 32,borderBottomColor: errInput.includes("username") ? "red" : 'grey',
                                        borderBottomWidth: StyleSheet.hairlineWidth}}
                        />
                   </View>

                   <View style={{marginBottom: 38}}>
                    <Text style={{ color: errInput.includes("phonenumber") ? "red": "grey",fontSize: 15}}>Phone number</Text>
                        <TextInput
                            value={phonenumber}
                            keyboardType="numeric"
                            onChangeText={text => setPhoneNumber(text)}
                            style={{height: 32,borderBottomColor: errInput.includes("phonenumber") ? "red" : 'grey',
                                    borderBottomWidth: StyleSheet.hairlineWidth}}
                        />
                   </View>

                   <View>
                    <Text style={{color: errInput.includes("phonenumber") ? "red" : "grey",fontSize: 15}}>Password</Text>
                        <TextInput
                            value={password}
                            onChangeText={text => setPassword(text)}
                            secureTextEntry
                            style={{height: 32,borderBottomColor: errInput.includes("phonenumber") ? "red" : 'grey',borderBottomWidth: StyleSheet.hairlineWidth}}
                        />
                   </View>
                   {isLoading && screenName === "SignUp"
                    ?  
                    <View style={styles.buttonSignUp}>
                          <ActivityIndicator size="small" color="red" />
                    </View>
                     :<TouchableOpacity
                        onPress={() => SignUpAccount()}
                        style={styles.buttonSignUp}>
                                <Text style={{fontWeight: "bold",color: "#fff",fontSize: 20}}>
                                    Sign Up
                                </Text>
                           
                        </TouchableOpacity>
                    }

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
    },
    buttonSignUp: {
        borderRadius: 8,
        marginTop: 32,
        width: '100%',
        height: 46,
        backgroundColor: "#4EC1E2",
        alignItems:'center',
        justifyContent:"center"
    }
})

export default SignUpScreen