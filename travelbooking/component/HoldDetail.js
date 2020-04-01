import React,{useEffect,useState} from 'react'
import { StyleSheet,View,Text,TouchableOpacity,Alert } from 'react-native'
import {updateBookedTour} from './../action/TourAction'
import { useDispatch } from 'react-redux'
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
    return(
        <>
            {dataHold && 
                <View style={{flexDirection:"row",alignItems:'center'}}>
                    <Text style={{fontSize: 17,color:'green',marginRight:16}}><Text style={{fontWeight: "600",fontSize: 18}}>{dataHold.user.username}</Text> đang giữ {dataHold.count} vé</Text>
                   {dataHold.user._id === userId &&
                    <TouchableOpacity onPress={() => bookTour()}>
                        <Text style={{fontSize: 17,color: 'red'}}>Chốt</Text>
                   </TouchableOpacity> }
                </View>
            }
        </>
       
    )
}
export default HoldDetail