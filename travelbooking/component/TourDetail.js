import React,{useEffect,useState} from 'react'
import { View,Text,StyleSheet,TouchableOpacity,FlatList } from 'react-native'
import API from './../services/API'
import moment from 'moment'
import numeral from 'numeral'
import {scaledSize} from './../config/nomalize'


const TourDetail = ({navigation}) =>{
    const [tourDetail,setTourDetail] = useState(null)
    useEffect(() =>{
        const tourId = navigation.getParam("tourId")
        if(!tourId){
            navigation.goBack()
        }
        const fetchData = async () =>{
            const res = await API.getTourDetail(tourId)
            const data = res.data
            if(data.result === "ok"){
                setTourDetail(data.data)
            }else{
                alert(data.message)
            }
        }
        fetchData()
    },[])

    const _renderUserAdded = users =>{
        return (
            <View style={{flexDirection: 'row',marginTop: scaledSize(16)}}>
                 <Text style={{fontSize: scaledSize(18),marginRight: scaledSize(16),marginTop: scaledSize(5)}}>Users : </Text>
                 <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                    {users.map(user =>{
                        return (
                            <View 
                                style={{
                                    marginRight: scaledSize(16),
                                    paddingHorizontal: scaledSize(12),
                                    paddingVertical: scaledSize(6),
                                    borderColor: 'grey',
                                    borderWidth: StyleSheet.hairlineWidth
                                    }} key={user._id}>
                                <Text style={{fontSize: scaledSize(15)}}>{user.username}</Text>
                            </View>
                        )
                    })}   
                 </View>
            </View>
        )
    }

    const _renderItem = item =>{
        const data = item.item
                return (
                    <View key={data._id} style={{padding: scaledSize(8),flexDirection: "row",borderBottomColor: '#ccc',borderBottomWidth: StyleSheet.hairlineWidth}}>
                        <Text style={{flex: 0.2,fontSize: scaledSize(18),textAlign: 'center'}}>{item.index + 1}</Text>
                        <Text style={{flex: 0.5,fontSize: scaledSize(18),textAlign:'center'}}>{data.user.username}</Text>
                        <Text style={{flex: 0.3,fontSize: scaledSize(18),textAlign:'center'}}>{data.count}</Text>
                    </View>
                )
    }

    const _renderTourBooked = (tourBooked) =>{
        return(
            <View style={{marginTop: scaledSize(16),borderTopColor: 'grey',borderTopWidth: 1,paddingTop: scaledSize(16),flex:1}}>
                <Text style={{textAlign: "center",fontSize: scaledSize(20),fontWeight: '500',color: "red"}}>Danh Sách Vé Đã Đặt</Text>
                <View style={{padding: scaledSize(8),flexDirection: "row"}}>
                    <Text style={{flex: 0.2,fontSize: 18,textAlign:'center'}}>STT</Text>
                    <Text style={{flex: 0.5,fontSize: 18,textAlign:'center'}}>Người Bán</Text>
                    <Text style={{flex: 0.3,fontSize: 18,textAlign: 'center'}}>Số Vé</Text>
                </View>
                <FlatList 
                data={tourBooked}
                keyExtractor = {(item,index) => `${index}`}
                showsVerticalScrollIndicator={false}
                renderItem={(item) => _renderItem(item)}
                />
            </View>
        )
    }
    const renderTourDetail = () =>{
        return(
            <View style={{flex:1}}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: scaledSize(16)}}>Tên Tour : </Text>
                    <Text style={styles.textDetail}>{tourDetail.tourname}</Text>
                </View>
                <View style={{flexDirection: 'row',marginTop: scaledSize(16)}}>
                    <Text style={{fontSize: scaledSize(16)}}>Lịch Trình : </Text>
                    <Text style={styles.textDetail}>{tourDetail.tourtrip}</Text>
                </View>
                <View style={{flexDirection: 'row',marginTop: scaledSize(16)}}>
                    <Text style={{fontSize: scaledSize(16)}}> Tổng Số Chỗ :  </Text>
                    <Text style={styles.textDetail}>{tourDetail.ticketCount}</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop: scaledSize(16)}}>
                    <Text style={{fontSize:  scaledSize(16)}}> Số Chỗ Đã Đặt :  </Text>
                    <Text style={styles.textDetail}>{tourDetail.tourBookedCount}</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop: scaledSize(16)}}>
                    <Text style={{fontSize:  scaledSize(16)}}>Giá Tour :  </Text>
                    <Text style={styles.textDetail}>{numeral(tourDetail.ticketPrice).format('0,0')}</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop: scaledSize(16)}}>
                    <Text style={{fontSize:  scaledSize(16)}}>Thời Gian :  </Text>
                    <Text style={styles.textDetail}>{tourDetail.tourTime}</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop: scaledSize(16)}}>
                    <Text style={{fontSize:  scaledSize(16)}}>Ngày Khởi Hành :</Text>
                    <Text style={styles.textDetail}>{moment(tourDetail.departureDate).format("DD/MM/YYYY")}</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop: scaledSize(16)}}>
                    <Text style={{fontSize:  scaledSize(16)}}>Hãng Hàng Không :</Text>
                    <Text style={styles.textDetail}>{tourDetail.airlines}</Text>
                </View>
                {tourDetail.users.length > 0 && _renderUserAdded(tourDetail.users)}
                {tourDetail.tourBooked.length > 0 && _renderTourBooked(tourDetail.tourBooked)}
            </View>
        )
    }

    return(
        <View style={styles.container}>
            {tourDetail && renderTourDetail()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#fff",
        padding: scaledSize(16)
    },
    textDetail :{
        marginLeft: scaledSize(12),
        fontSize: scaledSize(16),
        color:"grey",
        flex: 1,
        flexWrap:'wrap'
    }
})

TourDetail.navigationOptions = () =>({
    title: "Thông Tin Tour"
})

export default TourDetail