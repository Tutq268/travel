import React,{useEffect,useState} from 'react'
import { StyleSheet,View,Text,TouchableOpacity,Alert } from 'react-native'
import {updateBookedTour,remoteHoldtOUR} from './../action/TourAction'
import { useDispatch } from 'react-redux'
import {scaledSize} from './../config/nomalize'
import API from './../services/API'
const HoldDetail = ({holdId,userId,tourId}) =>{
    const [dataHold,setDataHold] = useState()
    const dispatch = useDispatch()
    useEffect(() =>{
        const fetchData = async () =>{
            API.getHoldTour(holdId).then(res =>{
                   const data = res.data
                   if(data.result === "ok"){
                        setDataHold(data.data)
                   }
                }).catch(err =>{
                    console.log(err)
                })
        }

        fetchData()
    },[])
    const bookTour = () =>{
        const data = {
            tourId: tourId,
            countBooked: +dataHold.count,
            holdId : holdId
        }
 
        Alert.alert("Thông báo",
                    "Xác nhận chốt vé",
                    [
                        {text: 'Cancle',style: 'cancel'},
                        {text: "Xác Nhận",onPress: () => dispatch(updateBookedTour(data))}
                    ]
                    )
    }
    const removeTourHold = () =>{
        API.removeHoldTour(holdId,tourId).then(res =>{
            const data = res.data
            if(data.result === "ok"){
                const dataUpdate = {
                    tourHold : data.data,
                    tourId: tourId
                }
                dispatch(remoteHoldtOUR(dataUpdate))
            }else{
                alert(data.message)
            }
        }).catch(err =>{
            console.log(err)
        })
    }

    return(
        <>
            {dataHold && 
                <View style={{flexDirection:"row",alignItems:'center'}}>
                    <Text style={{fontSize: scaledSize(17),color:'green',marginRight:scaledSize(16)}}>
                        <Text style={{fontWeight: "600",fontSize:scaledSize(18)}}>
                            {dataHold.user.username}
                        </Text> đang giữ {dataHold.count} vé</Text>
                   {dataHold.user._id === userId &&
                   <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={() => bookTour()}>
                            <Text style={{fontSize: scaledSize(17),color: 'green'}}>Chốt</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => removeTourHold()}>
                         <Text style={{fontSize: scaledSize(17),color: 'red',marginLeft: scaledSize(8)}}>Huỷ</Text>
                        </TouchableOpacity>
                   </View>
                     }
                </View>
            }
        </>
       
    )
}
export default HoldDetail