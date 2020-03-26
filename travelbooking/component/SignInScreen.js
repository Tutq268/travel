import React,{useState,useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {View,Text,StyleSheet,SafeAreaView,TextInput,TouchableOpacity,ActivityIndicator} from 'react-native'
import SiteMap from './../common/SiteMap'
import {signInAccount,resetStatusSignUp} from './../action/AuthAction'

const SignInScreen = ({navigation}) =>{
   
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const [errLogin,setErrLogin] = useState("")
    const [successSiginUp,setSuccessSignUp] = useState("")
    const dispatch = useDispatch()
    const {statusSignUp,errorSignIn,loginSuccess} = useSelector(state => state.auth)
    const {isLoading,screenName} = useSelector(state => state.loading)
    useEffect(() =>{
        if(statusSignUp){
            if(statusSignUp.status === "success"){
                setSuccessSignUp(statusSignUp.message)
            }
        }
        if(loginSuccess){
            navigation.navigate("App")
        }
    },[statusSignUp,loginSuccess])

    const _renderSuccessSignUp = () =>{
        return(
            <View style={{marginBottom: 16,alignItems: 'center'}}>
                <Text style={{color: 'green',fontStyle:"italic"}}>{successSiginUp}</Text>
             </View>
        )
    }
    const _renderErrorSignIn = () =>{
        return(
            <View style={{marginBottom: 16,alignItems: 'center'}}>
                <Text style={{color: 'red',fontStyle:"italic"}}>{errorSignIn}</Text>
             </View>
        )
    }
    const _handleSignIn = () =>{
        const errInput = []
        if(username === ""){
            errInput.push("username")
        }
        if(password === ""){
            errInput.push("password")
        }
        if(errInput.length === 0){
            setUsername("")
            setPassword("")
            dispatch(signInAccount(username,password))
        }else{
            setErrLogin(errInput)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{padding: 32,flex: 1}}>
               <Text style={{fontSize: 32,fontWeight: 'bold',marginTop: 32}}>Login</Text>
               <View style={{flex: 1, justifyContent: 'center'}}>
               {successSiginUp !== "" && _renderSuccessSignUp()}
               {errorSignIn && _renderErrorSignIn()}
                   <View style={{marginBottom: 38}}>
                    <Text style={{color: errLogin.includes("username") ? "red" : "grey",fontSize: 15}}>Username</Text>
                        <TextInput
                            value={username}
                            onChangeText = {text => setUsername(text)}
                            style={{height: 32,borderBottomColor:errLogin.includes("username") ? "red" : 'grey',borderBottomWidth: StyleSheet.hairlineWidth}}
                        />
                   </View>
                  
                   <View>
                    <Text style={{color:errLogin.includes("password") ? "red" : "grey",fontSize: 15}}>Password</Text>
                        <TextInput
                            value={password}
                            secureTextEntry
                            onChangeText={text => setPassword(text)}
                            style={{height: 32,borderBottomColor: errLogin.includes("password") ? "red" : 'grey',borderBottomWidth: StyleSheet.hairlineWidth}}
                        />
                   </View>
                   {isLoading && screenName === "SignIn"
                    ? 
                    <View
                    style={styles.buttonSignIn}>
                         <ActivityIndicator size="small" color="red" />
                    </View>  
                    : <TouchableOpacity 
                        onPress = {() => _handleSignIn()}
                        style={styles.buttonSignIn}>
                            <Text style={{fontWeight: "bold",color: "#fff",fontSize: 20}}>
                                Login
                            </Text>
                    </TouchableOpacity>
                    }

                    <TouchableOpacity 
                        style={{width: '100%',alignItems:'center',marginTop: 16}}
                        onPress={() => {
                            dispatch(resetStatusSignUp())
                            setSuccessSignUp("")
                            SiteMap.showScreen(navigation,"SignUp")
                        }}
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
    },
    buttonSignIn:{
        borderRadius: 8,
        marginTop: 32,
        width: '100%',
        height: 46,
        backgroundColor: "#4EC1E2",
        alignItems:'center',
        justifyContent:"center"
    }
})

export default SignInScreen