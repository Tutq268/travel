import React from 'react'
import {View,Text,StyleSheet,TouchableOpacity,Image } from 'react-native'

const ManagerScreen = () =>{
    return (
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
                    <Text style={{fontSize: 18,fontWeight:'400'}}>Dũng Nguyễn</Text>
                    <TouchableOpacity>
                        <Text style={{fontSize: 18,color: "#4EC1E2"}}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{flexDirection:'column'}}>
                <Text style={styles.titleSettingItem}>Address</Text>
                <View style={styles.itemStyle}>
                    <Text style={{fontSize: 18,fontWeight:'400'}}>Hà Nội</Text>
                    <TouchableOpacity>
                        <Text style={{fontSize: 18,color: "#4EC1E2"}}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{flexDirection:'column'}}>
                <Text style={styles.titleSettingItem}>Phone</Text>
                <View style={styles.itemStyle}>
                    <Text style={{fontSize: 18,fontWeight:'400'}}>0988699876</Text>
                    <TouchableOpacity>
                        <Text style={{fontSize: 18,color: "#4EC1E2"}}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{flexDirection:'column'}}>
                <Text style={styles.titleSettingItem}>Email</Text>
                <View style={styles.itemStyle}>
                    <Text style={{fontSize: 18,fontWeight:'400'}}>dung@gmail.com</Text>
                </View>
            </View>
          
        </View>
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
    }
})

ManagerScreen.navigationOptions = () =>({
    title: "Account"
})
export default ManagerScreen