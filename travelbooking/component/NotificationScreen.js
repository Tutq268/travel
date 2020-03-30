import React,{useState,useEffect} from 'react'
import { View,Text,StyleSheet,FlatList,Image, TouchableOpacity } from 'react-native'
import API from './../services/API'
import apiUrl from './../config/ApiUrl'
import ScreenName from './../constant/ScreenName'
import SiteMap from './../common/SiteMap'

const NotificationScreen = ({navigation}) =>{
    const [notifData,setNotiData] = useState()
    useEffect(() =>{
        const fetchData = async () =>{
            const res = await API.getAllNotification()
            const data = res.data
            if(data.result === "ok"){
                setNotiData(data.data)
            }else{
                alert(data.message)
            }
        }
        fetchData()
    },[])

    const showNotifData = data =>{
        if(!data.isRead){
            API.readNotification(data._id).then(res=>{
                const data = res.data
                if(data.result === "ok"){
                    navigation.navigate("TOUR_DETAIL",{tourId: data.tourId})
                }
                else{
                   alert(data.message)
                }
            }).catch(err =>{
                console.log(err)
            })
        }else{
            navigation.navigate("TOUR_DETAIL",{tourId: data.tourId})
        }
    }

    const _renderItemNotif = item =>{
        const data= item.item
        return(
            <TouchableOpacity 
                style={StyleSheet.flatten([styles.itemNotif,{backgroundColor: !data.isRead ? "#f0eceb" : "transparent"}])}
                onPress={() => showNotifData(data)}
                >
                 <Image
                    source= {!data.sendUser.avatar ? require("./../assets/default-avatar.png") :  {uri: apiUrl.host + data.sendUser.avatar}}
                    style={{width: 50,height: 50,borderRadius: 50,marginRight: 16}}
                />
               
                <Text style={{fontSize: 18,flex: 1}}><Text style={{fontSize: 18,fontWeight: '600'}}>{data.sendUser.username}</Text> {data.content}</Text>  
            </TouchableOpacity>
        )
    }

    const _renderNotifData = () =>{
        return(
            <FlatList 
            showsVerticalScrollIndicator={false}
            data={notifData}
            keyExtractor={(item,index) => `${index}`}
            renderItem = {(item) => _renderItemNotif(item)}
           />
        )
    }
    return (
        <View style={styles.container}>
            {notifData && _renderNotifData()}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    itemNotif:{
        flex: 1,
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:16
    }
})

NotificationScreen.navigationOptions = () => ({
    title: "Notification"
})
export default NotificationScreen