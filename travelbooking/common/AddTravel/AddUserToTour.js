import React,{useState,useEffect} from 'react'
import { View,Text,StyleSheet,TouchableOpacity,SafeAreaView,TextInput,FlatList,Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDispatch,useSelector } from 'react-redux'
import {getListUser,addUser,removeUser} from './../../action/TourAction'
import AsyncStorage from '@react-native-community/async-storage'
import apiUrl from './../../config/ApiUrl'
const AddUserToTour = ({navigation}) =>{
    const [textSearch,setTextSearch] = useState("")
    const {listUser,getUserError,userAdd} = useSelector(state => state.tour)
    const [userId,setUserId] = useState()
    const dispatch = useDispatch()

    useEffect(()=>{
        const getUserId = async () =>{
            const userId = await AsyncStorage.getItem("userId")
            setUserId(userId)
        }
        getUserId()
    },[])
  
    useEffect(() =>{
        if(userAdd.includes(1)){
            console.log("123")
        }else{
            console.log("abc")
        }
        dispatch(getListUser())
    },[])
    const _renderHeader = () =>{
        return(
            <View style={{flexDirection: "row",paddingHorizontal: 16, alignItems:'center'}}>
                <TouchableOpacity activeOpacity={0.5} onPress ={() =>SiteMap.goBack(navigation)}>
                    <Icon 
                        name="ios-arrow-round-back"
                        size={36}
                        color="grey"
                    />
                </TouchableOpacity>
                <Text style={{fontSize: 20,flex: 1,textAlign:'center'}}>
                       Choose User
                    </Text>
            </View>
        )
    }

    const _renderSearchUser = () =>{
        return(
            <View style={{marginTop: 16,paddingHorizontal: 16}}>
                <View style={styles.searchView}>
                    <TextInput 
                        value={textSearch}
                        onChangeText={(text) => setTextSearch(text)}
                        placeholder="Type a username"
                        style={{fontSize: 16}}
                    />
                </View>
            </View>
        )
    }
    const _renderErrorGetUser = () =>{
        return(
            <View style={{flex: 1,justifyContent:'center',alignItems:'center'}}>
                <TextInput style={{fontSize: 18,color: "red"}}>{getUserError}</TextInput>
            </View>
        )
    }

    const handleAdd = (data) =>{
        dispatch(addUser(data))
    }

    const handleRemove = (userId) =>{
        dispatch(removeUser(userId))
    }

    const _renderItem = (item,index) =>{
        const data = item.item
        
        if(data._id !== userId){
        const checkAdd = userAdd.findIndex(user => user._id === data._id)
        return(
            <View key={index}
                 style={{width: '100%',flex: 1,flexDirection: "row",paddingVertical: 16,alignItems:'center',borderBottomColor: '#ccc',borderBottomWidth: StyleSheet.hairlineWidth}}
                 >
                <Image 
                    resizeMode="contain"
                    source= {!data.avatar ? require("./../../assets/default-avatar.png") :  {uri: apiUrl.host + data.avatar}}
                    style={{width: 56,height:56,borderRadius: 56,flex: 0.3}}
                   />
                <Text style={{fontSize: 20,fontWeight: "400",flex: 0.5}}>{data.username}</Text>
                {/* {userAdd.length > 0 && userAdd.includes(data._id)
                ? <Text style={{flex: 0.2,fontSize: 18,color: "red",fontWeight: "400"}}>Xoá</Text>
                :     <TouchableOpacity style={{flex: 0.2}} onPress={() => handleAdd(data)}>
                            <Text style={{fontSize: 18,color: "#4EC1E2",fontWeight: "400"}}>Thêm</Text>
                        </TouchableOpacity>
                } */}
                 <TouchableOpacity style={{flex: 0.2}} onPress={() => checkAdd < 0 ?  handleAdd(data) : handleRemove(data._id)}>
                        <Text style={{fontSize: 18,color: checkAdd < 0 ? "#4EC1E2" : "red",fontWeight: "400"}}>{checkAdd < 0  ? "Thêm" : "Xoá"}</Text>
                    </TouchableOpacity>
                
            </View>
        )
    }
    }
    const _renderListUser = () =>{
        return(
            <View style={{flex: 1,marginVertical: 16,paddingHorizontal: 16,borderTopColor: "#ccc",borderTopWidth: StyleSheet.hairlineWidth}}>
                <FlatList 
                    data={listUser}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item,index) => `${index}`}
                    renderItem ={(item,index) => _renderItem(item,index)}
                />
            </View>
           
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            {_renderHeader()}
            {_renderSearchUser()}
            {getUserError && _renderErrorGetUser()}
            {listUser && _renderListUser()}
        </SafeAreaView>
    )
}

AddUserToTour.navigationOptions = {
    headerShown : false
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    searchView: {
        width: '100%',
        height: 40,
        backgroundColor: "#edebeb",
        borderRadius: 16,
        borderWidth: StyleSheet.hairlineWidth,
        justifyContent: 'center',
        paddingHorizontal: 16
    }
})

export default AddUserToTour