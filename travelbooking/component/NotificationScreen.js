import React,{useState,useEffect} from 'react'
import { View,Text,StyleSheet,FlatList,Image, TouchableOpacity } from 'react-native'
import API from './../services/API'
import apiUrl from './../config/ApiUrl'
import ScreenName from './../constant/ScreenName'
import SiteMap from './../common/SiteMap'
import {scaledSize} from './../config/nomalize'


const NotificationScreen = ({navigation}) =>{
    const [notifData,setNotiData] = useState()

    const fetchData = async () =>{
        const res = await API.getAllNotification()
        const data = res.data
        if(data.result === "ok"){
            setNotiData(data.data)
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


    const showNotifData = data =>{
        if(!data.isRead){
            API.readNotification(data._id).then(res=>{
                const dataRead = res.data
                if(dataRead.result === "ok"){
                    if(notifType === "add_user" || notifType === "booked_ticket"){
                        navigation.navigate("NotifTourDetail",{tourId: data.tourId})
                    }else if(notifType === "add_work"){
                        navigation.navigate("Word")
                    }
                }
                else{
                   alert(data.message)
                }
            }).catch(err =>{
                console.log(err)
            })
        }else{
            navigation.navigate("NotifTourDetail",{tourId: data.tourId})
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
                    style={{
                        width: scaledSize(45),
                        height: scaledSize(45),
                        borderRadius: scaledSize(45),
                        marginRight: scaledSize(16)
                    }}
                />
               
                <Text style={{fontSize: scaledSize(18),flex: 1}}>
                    <Text style={{fontSize: scaledSize(18),fontWeight: '600'}}>{data.sendUser.username}
                    </Text> {data.content}
                </Text>  
            </TouchableOpacity>
        )
    }
    const _renderEmtyNotif = () =>{
        return(
            <View style={{flex: 1,justifyContent:"center",alignItems:'center'}}>
                <Text style={{fontSize: scaledSize(18),color:"grey"}}>Bạn chưa có thông báo.!</Text>
            </View>
        )
    }
    const _renderNotifData = () =>{
        return(
            <FlatList 
            showsVerticalScrollIndicator={false}
            data={notifData}
            keyExtractor={(item,index) => `${index}`}
            renderItem = {(item) => _renderItemNotif(item)}
            ListEmptyComponent={() => _renderEmtyNotif()}
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
        padding:scaledSize(12)
    }
})

NotificationScreen.navigationOptions = () => ({
    title: "Notification"
})
export default NotificationScreen