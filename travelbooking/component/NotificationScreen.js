import React from 'react'
import { View,Text,StyleSheet,FlatList,Image } from 'react-native'
import {notifData} from './../common/fakeData'
const NotificationScreen = () =>{


    const _renderItemNotif = item =>{
        const data= item.item
        return(
            <View style={styles.itemNotif}>
                <Image 
                    source={{uri: data.account.avatar}}
                    style={{width: 36,height: 36,borderRadius: 36,marginRight: 16}}
                />
               
                    <Text style={{fontSize: 18,flex: 1}}><Text style={{fontSize: 18,fontWeight: '600'}}>{data.account.name}</Text> {data.title}</Text>                
            </View>
        )
    }

    return (
        <View style={styles.container}>
           <FlatList 
            showsVerticalScrollIndicator={false}
            data={notifData}
            keyExtractor={(item,index) => `${index}`}
            renderItem = {(item) => _renderItemNotif(item)}
           />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 16
    },
    itemNotif:{
        flex: 1,
        flexDirection: "row",
        justifyContent:"space-between",
        paddingVertical: 16
    }
})

NotificationScreen.navigationOptions = () => ({
    title: "Notification"
})
export default NotificationScreen