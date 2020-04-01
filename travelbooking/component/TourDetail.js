import React,{useEffect,useState} from 'react'
import { View,Text,StyleSheet,TouchableOpacity,FlatList } from 'react-native'
import API from './../services/API'
import moment from 'moment'
import numeral from 'numeral'


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
            <View style={{flexDirection: 'row',marginTop: 16}}>
                 <Text style={{fontSize: 18,marginRight: 16,marginTop: 5}}>Users : </Text>
                 <View style={{flexDirection: 'row',flexWrap: 'wrap'}}>
                    {users.map(user =>{
                        return (
                            <View style={{marginRight: 16,paddingHorizontal: 12,paddingVertical: 6,borderColor: 'grey',borderWidth: StyleSheet.hairlineWidth}} key={user._id}>
                                <Text style={{fontSize: 15}}>{user.username}</Text>
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
                    <View key={data._id} style={{padding: 8,flexDirection: "row",borderBottomColor: '#ccc',borderBottomWidth: StyleSheet.hairlineWidth}}>
                        <Text style={{flex: 0.2,fontSize: 18,textAlign: 'center'}}>{item.index + 1}</Text>
                        <Text style={{flex: 0.5,fontSize: 18,textAlign:'center'}}>{data.user.username}</Text>
                        <Text style={{flex: 0.3,fontSize: 18,textAlign:'center'}}>{data.count}</Text>
                    </View>
                )
    }

    const _renderTourBooked = (tourBooked) =>{
        return(
            <View style={{marginTop: 16,borderTopColor: 'grey',borderTopWidth: 1,paddingTop: 16,flex:1}}>
                <Text style={{textAlign: "center",fontSize: 20,fontWeight: '500',color: "red"}}>Danh Sách Vé Đã Đặt</Text>
                <View style={{padding: 8,flexDirection: "row"}}>
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
                    <Text style={{fontSize: 18}}>Tên Tour : </Text>
                    <Text style={styles.textDetail}>{tourDetail.tourname}</Text>
                </View>
                <View style={{flexDirection: 'row',marginTop: 16}}>
                    <Text style={{fontSize: 18}}>Lịch Trình : </Text>
                    <Text style={styles.textDetail}>{tourDetail.tourtrip}</Text>
                </View>
                <View style={{flexDirection: 'row',marginTop: 16}}>
                    <Text style={{fontSize: 18}}> Tổng Số Chỗ :  </Text>
                    <Text style={styles.textDetail}>{tourDetail.ticketCount}</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop: 16}}>
                    <Text style={{fontSize: 18}}> Số Chỗ Đã Đặt :  </Text>
                    <Text style={styles.textDetail}>{tourDetail.tourBookedCount}</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop: 16}}>
                    <Text style={{fontSize: 18}}>Giá Tour :  </Text>
                    <Text style={styles.textDetail}>{numeral(tourDetail.ticketPrice).format('0,0')}</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop: 16}}>
                    <Text style={{fontSize: 18}}>Thời Gian :  </Text>
                    <Text style={styles.textDetail}>{tourDetail.tourTime}</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop: 16}}>
                    <Text style={{fontSize: 18}}>Ngày Khởi Hành :</Text>
                    <Text style={styles.textDetail}>{moment(tourDetail.departureDate).format("DD/MM/YYYY")}</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop: 16}}>
                    <Text style={{fontSize: 18}}>Hãng Hàng Không :</Text>
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
        padding: 16
    },
    textDetail :{
        marginLeft: 16,
        fontSize: 18,
        color:"grey",
        flex: 1,
        flexWrap:'wrap'
    }
})

TourDetail.navigationOptions = () =>({
    title: "Thông Tin Tour"
})

export default TourDetail