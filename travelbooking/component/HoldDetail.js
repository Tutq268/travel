import React,{useEffect,useState} from 'react'
import { StyleSheet,View,Text,TouchableOpacity } from 'react-native'
import API from './../services/API'
const HoldDetail = ({holdId,userId}) =>{
    const [dataHold,setDataHold] = useState()
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
    return(
        <>
            {dataHold && 
                <View style={{flexDirection:"row",alignItems:'center'}}>
                    <Text style={{fontSize: 17,color:'green',marginRight:16}}><Text style={{fontWeight: "600",fontSize: 18}}>{dataHold.user.username}</Text> đang giữ {dataHold.count} vé</Text>
                   {dataHold.user._id === userId &&
                    <TouchableOpacity>
                        <Text style={{fontSize: 17,color: 'red'}}>Chốt</Text>
                   </TouchableOpacity> }
                </View>
            }
        </>
       
    )
}
export default HoldDetail