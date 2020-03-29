import React,{useEffect,useState} from 'react'
import { View,Text,StyleSheet,TouchableOpacity,FlatList } from 'react-native'
import API from './../services/API'
import moment from 'moment'

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
        console.log(item)
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
                <Text style={{textAlign: "center",fontSize: 20,fontWeight: '500',color: "red"}}>List Ticket Booked</Text>
                <View style={{padding: 8,flexDirection: "row"}}>
                    <Text style={{flex: 0.2,fontSize: 18,textAlign:'center'}}>STT</Text>
                    <Text style={{flex: 0.5,fontSize: 18,textAlign:'center'}}>Username</Text>
                    <Text style={{flex: 0.3,fontSize: 18}}>Ticket Count</Text>
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
                    <Text style={{fontSize: 18}}>Tour name : </Text>
                    <Text style={styles.textDetail}>{tourDetail.tourname}</Text>
                </View>
                <View style={{flexDirection: 'row',marginTop: 16}}>
                    <Text style={{fontSize: 18}}>Tour trip : </Text>
                    <Text style={styles.textDetail}>{tourDetail.tourtrip}</Text>
                </View>
                <View style={{flexDirection: 'row',marginTop: 16}}>
                    <Text style={{fontSize: 18}}> Tour Ticket Count :  </Text>
                    <Text style={styles.textDetail}>{tourDetail.ticketCount}</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop: 16}}>
                    <Text style={{fontSize: 18}}> Tour Ticket Booked :  </Text>
                    <Text style={styles.textDetail}>{tourDetail.tourBookedCount}</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop: 16}}>
                    <Text style={{fontSize: 18}}>Tour Ticket Price :  </Text>
                    <Text style={styles.textDetail}>{tourDetail.ticketPrice}</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop: 16}}>
                    <Text style={{fontSize: 18}}>Tour time :  </Text>
                    <Text style={styles.textDetail}>{tourDetail.tourTime}</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop: 16}}>
                    <Text style={{fontSize: 18}}>Departure date :</Text>
                    <Text style={styles.textDetail}>{moment(tourDetail.departureDate).format("DD/MM/YYYY")}</Text>
                </View>

                <View style={{flexDirection: 'row',marginTop: 16}}>
                    <Text style={{fontSize: 18}}>Airlines :</Text>
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
    title: "Tour Detail"
})

export default TourDetail