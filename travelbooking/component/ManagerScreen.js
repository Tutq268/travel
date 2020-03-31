import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Image,TextInput } from 'react-native'
import API from './../services/API'
import {useDispatch} from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import {logoutAccount} from './../action/AuthAction'
const ManagerScreen = ({navigation}) =>{
    const [myInfo,setMyInfo] = useState()
    const distpatch = useDispatch()
    const [editInfo,setEditInfo] = useState("")
    const [usernameEdit,setUsernameEdit] = useState("")
    const [phoneEdit,setPhoneEdit] = useState("")
    const [emailEdit,setEmailEdit] = useState("")
    const [addressEdit,setAddressEdit] = useState("")
    const fetchData = async () =>{
        const res = await API.getMe()
        const data = res.data
        if(data.result === "ok"){
            setMyInfo(data.data)
            setUsernameEdit(data.data.username)
            setPhoneEdit(data.data.phone)
            setAddressEdit(data.data.address)
            setEmailEdit(data.data.email)
        }else{
            alert(data.message)
        }
    }
    useEffect(() =>{
        fetchData()
    },[])

    useEffect(() => {
        const navFocusListener = navigation.addListener('willFocus', () => {    
            fetchData()
        });
        return () => {
            navFocusListener.remove();
        };
    }, []);


    const _handleLogout = async () =>{
        distpatch(logoutAccount())
        await AsyncStorage.removeItem("userToken")
        await AsyncStorage.removeItem("userId")
        navigation.navigate("Word")
        navigation.navigate("Auth")
    }


    const saveEditInfo = () =>{
        if(editInfo === "") return
        if(editInfo === "username"){
            if(usernameEdit === myInfo.username || usernameEdit === ""){
                setEditInfo("")
                return
            }else{
                const editInfo = {username: usernameEdit}
                API.changeInfo(editInfo).then(res=>{
                    const data = res.data
                    if(data.result === "ok"){
                        const newInfo = {
                            ...myInfo,
                            username : usernameEdit
                        }
                        setMyInfo(newInfo)
                        setEditInfo("")
                    }else{
                        alert(data.message)
                        setEditInfo("")
                    }
                }).catch(err =>{
                    console.log("err")
                    setEditInfo("")
                })
            }
        }
        if(editInfo === "email"){
            if(emailEdit === myInfo.email || emailEdit === ""){
                setEditInfo("")
                return
            }else{
                const editInfo = {email: emailEdit}
                API.changeInfo(editInfo)
                    .then(res=>{
                    const data= res.data
                    if(data.result === "ok"){
                        const newInfo = {
                            ...myInfo,
                            email : emailEdit
                        }
                        setMyInfo(newInfo)
                        setEditInfo("")
                    }else{
                        alert(data.message)
                        setEditInfo("")
                    }
                }).catch(err =>{
                    console.log("err")
                })
            }
        }
        if(editInfo === "phone"){
            if(phoneEdit === myInfo.phone || phoneEdit === ""){
                setEditInfo("")
                return
            }else{
                const editInfo = {phone: phoneEdit}
                API.changeInfo(editInfo).then(res=>{
                    const data= res.data
                    if(data.result === "ok"){
                        const newInfo = {
                            ...myInfo,
                            phone : phoneEdit
                        }
                        setMyInfo(newInfo)
                        setEditInfo("")
                    }else{
                        alert(data.message)
                        setEditInfo("")
                    }
                }).catch(err =>{
                    console.log("err")
                    setEditInfo("")
                })
            }
        }
        if(editInfo === "address"){
            if(addressEdit === myInfo.address || addressEdit === ""){
                setEditInfo("")
                return
            }else{
                const editInfo = {address: addressEdit}
                API.changeInfo(editInfo).then(res=>{
                    const data= res.data
                    if(data.result === "ok"){
                        const newInfo = {
                            ...myInfo,
                            address : addressEdit
                        }
                        setMyInfo(newInfo)
                        setEditInfo("")
                    }else{
                        alert(data.message)
                    }
                }).catch(err =>{
                    console.log("err")
                })
            }
        }
    }

    const _renderData = () =>{
        return(
            <View style={styles.container}>
            <View style={styles.itemStyle}>
                <Text style={{fontSize: 30,fontWeight:'bold'}}>Settings</Text>
                <Image 
                    style={{width: 38,height: 38,borderRadius: 38}}
                    source={{uri: "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"}}
                />
            </View>
            <View style={{flexDirection:'column'}}>
                <Text style={styles.titleSettingItem}>Username</Text>
                <View style={styles.itemStyle}>
                {editInfo === "username" ? 
                    <TextInput
                    style={styles.textInputEdit}
                    defaultValue={myInfo.username} 
                    onChangeText={text => setUsernameEdit(text)} 
                    autoFocus={true}
                    />
                    : <Text style={{fontSize: 18,fontWeight:'400'}}>{myInfo.username}</Text>
                }
                <View style={{flexDirection:"row",justifyContent:'center'}}>
                    <TouchableOpacity onPress={() => {editInfo === "username" ? saveEditInfo() : setEditInfo("username")}}>
                        <Text style={{fontSize: 18,color: "#4EC1E2"}}> {editInfo === "username" ? "Save" : "Edit"} </Text>
                    </TouchableOpacity>
                    {editInfo === "username" &&
                        <TouchableOpacity onPress={() => setEditInfo("")}>
                            <Text style={{fontSize: 18,marginLeft:8,color: "red"}}>Cancle</Text>
                        </TouchableOpacity>
                    }
                </View>
                  
                </View>
            </View>

            <View style={{flexDirection:'column'}}>
                <Text style={styles.titleSettingItem}>Address</Text>
                <View style={styles.itemStyle}>
                {editInfo === "address" ? 
                    <TextInput
                    style={styles.textInputEdit}
                    defaultValue={myInfo.address} 
                    onChangeText={text => setAddressEdit(text)} 
                    autoFocus={true}
                    />
                 : <Text style={{fontSize: 18,fontWeight:'400'}}>{myInfo.address}</Text>
                }
                <View style={{flexDirection:"row"}}>
                    <TouchableOpacity onPress={() => {editInfo === "address" ? saveEditInfo() : setEditInfo("address")}}>
                        <Text style={{fontSize: 18,color: "#4EC1E2"}}> {editInfo === "address" ? "Save" : "Edit"} </Text>
                    </TouchableOpacity>
                    {editInfo === "address" &&
                        <TouchableOpacity onPress={() => setEditInfo("")}>
                            <Text style={{fontSize: 18,marginLeft:8,color: "red"}}>Cancle</Text>
                        </TouchableOpacity>
                    }
                </View>
                </View>
            </View>

            <View style={{flexDirection:'column'}}>
                <Text style={styles.titleSettingItem}>Phone</Text>
                <View style={styles.itemStyle}>
                    {editInfo === "phone" ? 
                        <TextInput
                        style={styles.textInputEdit}
                        defaultValue={myInfo.phone} 
                        onChangeText={text => setPhoneEdit(text)} 
                        keyboardType="numeric"
                        autoFocus={true}
                        />
                    : <Text style={{fontSize: 18,fontWeight:'400'}}>{myInfo.phone}</Text>
                    }
                    <View style={{flexDirection:"row"}}>
                        <TouchableOpacity onPress={() => {editInfo === "phone" ? saveEditInfo() : setEditInfo("phone")}}>
                            <Text style={{fontSize: 18,color: "#4EC1E2"}}> {editInfo === "phone" ? "Save" : "Edit"} </Text>
                        </TouchableOpacity>
                        {editInfo === "phone" &&
                            <TouchableOpacity onPress={() => setEditInfo("")}>
                                <Text style={{fontSize: 18,marginLeft:8,color: "red"}}>Cancle</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>

            <View style={{flexDirection:'column'}}>
                <Text style={styles.titleSettingItem}>Email</Text>
                <View style={styles.itemStyle}>
                    {editInfo === "email" ? 
                        <TextInput
                        style={styles.textInputEdit}
                        defaultValue={myInfo.email} 
                        onChangeText={text => setEmailEdit(text)} 
                        autoFocus={true}
                        />
                    : <Text style={{fontSize: 18,fontWeight:'400'}}>{myInfo.email}</Text>
                    }
                    <View style={{flexDirection:"row",justifyContent:'center'}}>
                        <TouchableOpacity onPress={() => {editInfo === "email" ? saveEditInfo() : setEditInfo("email")}}>
                            <Text style={{fontSize: 18,color: "#4EC1E2"}}> {editInfo === "email" ? "Save" : "Edit"} </Text>
                        </TouchableOpacity>
                        {editInfo === "email" &&
                            <TouchableOpacity onPress={() => setEditInfo("")}>
                                <Text style={{fontSize: 18,marginLeft:8,color: "red"}}>Cancle</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            </View>
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => _handleLogout()}
                 style={{marginHorizontal: 32,marginTop: 32,backgroundColor: "#4EC1E2",height: 46,justifyContent:"center",alignItems:'center'}}>
                <Text style={{color: "#fff",fontSize: 18,fontWeight: "500"}}>Đăng Xuất</Text>
            </TouchableOpacity>
            
        </View>
        )
    }
    return (
        <>
            {myInfo && _renderData()}
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 32,
        flexDirection: 'column'
    },
    itemStyle: {
        flexDirection:'row',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    titleSettingItem:{
        color:"grey",
        fontSize: 18,
        paddingVertical: 8
    },
    textInputEdit:{
        borderBottomColor: "grey",
        justifyContent:'flex-start' ,
        borderBottomWidth: StyleSheet.hairlineWidth,
        fontSize: 18,
        padding: 8,
        flex: 1,
        flexWrap: 'wrap'
    }
})

ManagerScreen.navigationOptions = () =>({
    title: "Account"
})
export default ManagerScreen