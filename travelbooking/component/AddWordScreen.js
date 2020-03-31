import React,{useState,useEffect} from 'react'
import { View,Text,StyleSheet,TouchableOpacity,Dimensions,FlatList,TextInput,RefreshControl } from 'react-native'
import moment from 'moment'
import numeral from 'numeral'
import * as ScreenName from './../constant/ScreenName'
import SiteMap from './../common/SiteMap'
import { Menu, MenuOption, MenuOptions, MenuTrigger, } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons'
import Dialog from "react-native-dialog"
import {getListTour,clearAddUser,updateBookedTour,addUser} from './../action/TourAction'
import { useDispatch,useSelector } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage'
import API from '../services/API'


const {width,height} = Dimensions.get("window")
const AddWordScreen = ({navigation}) =>{
    const [openHoldTicketDialog,setOpenHoldTicketDialog] = useState(false)
    const [openBookTicketDialog,setOpenBookTicketDialog] = useState(false)
    const [ticketBook,setTicketBook] = useState("")
    const [tourChoose,setTourChoose] = useState()
    const [isRefreshing,setRefreshing] = useState(false)
    const [userId,setUserId] = useState()
    const {listTour} = useSelector(state => state.tour)
    const dispatch = useDispatch()
    const fetchData = async () =>{
        dispatch(getListTour())
        const userId = await AsyncStorage.getItem("userId")
        setUserId(userId)
    }

    useEffect(() =>{
        setRefreshing(false)
    },[listTour])
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
   
    const _renderTicketHold = (count) =>{
        return (
            <View style={{flexDirection: "row",marginRight: 16}}>
                <Text style={{color: "red"}}>{count} vé đang được giữ</Text>
            </View>
        )
    }

    const setStar = (tourId,status) =>{
        const param ={
            _id: tourId,
            isStar: status
        }
        API.setStar(param).then(res =>{
            const data = res.data
            if(data.result === "ok"){
                fetchData()
            }else{
                alert(data.message)
            }
        }).catch(err =>{
            console.log(err)
        })
    }

    const _renderItem = item =>{
        const data = item.item
        return(
            <TouchableOpacity 
                style={StyleSheet.flatten([styles.tourItem,{backgroundColor: data.isStar ? "#F2F1DF" : "transparent"}])}
                 activeOpacity={0.5}
                 onPress={() => SiteMap.showScreen(navigation,ScreenName.TOUR_DETAIL,{tourId: data._id})}
                 >
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 15,color: "grey"}}>#{item.index + 1}</Text>
                        <Text style={{fontSize: 15,color: "grey"}}> - </Text>
                       
                    </View>
                    {/* {data.tour_hold > 0 && _renderTicketHold(data.tour_hold)} */}
                    <View style={{flexDirection: 'row',flex: 1,flexWrap:'wrap'}}>
                            <Text style={styles.tourName}>{data.tourname} - </Text>
                            <Text style={styles.tourName}>{data.tourTime}</Text>
                            <Text style={StyleSheet.flatten([styles.tourName,{color: 'green'}])}> || </Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={StyleSheet.flatten([styles.tourName,{color: 'red'}])}>{data.tourBookedCount}</Text>
                                <Text style={StyleSheet.flatten([styles.tourName,{color: 'red'}])}> of </Text>
                                <Text style={StyleSheet.flatten([styles.tourName,{color:"red"}])}>{data.ticketCount}</Text>
                            </View>
                        </View>
                    <Menu>
                        <MenuTrigger>
                            <Icon 
                                name="ios-more"
                                size={26}
                                color="grey"
                                />
                        </MenuTrigger>
                        <MenuOptions optionsContainerStyle={{ borderRadius: 16, marginTop: 20,width: 130,paddingVertical: 10 }}>
                           <MenuOption style={{padding: 10,alignItems: 'center'}}
                                onSelect={() => {
                                    setOpenHoldTicketDialog(true)
                                }}
                            >
                              <Text style={{fontSize: 18,fontWeight: '500'}}>Giữ Vé</Text>
                           </MenuOption>

                           <MenuOption style={{padding: 10,alignItems: 'center'}}
                                onSelect={() => {
                                    setOpenBookTicketDialog(true)
                                    setTourChoose(data)
                                    setTicketBook("")
                                }}
                            >
                              <Text  style={{fontSize: 18,fontWeight: '500'}}>Chốt Vé</Text>
                           </MenuOption>
                         {userId === data.admin && <MenuOption style={{padding: 10,alignItems: 'center'}}
                            onSelect={() =>{
                                dispatch(addUser(data.users))
                                 SiteMap.showScreen(navigation,ScreenName.ADD_TRAVEL,{TOUR_ITEM: data})
                                }}
                           >
                              <Text  style={{fontSize: 18,fontWeight: '500'}}>Chỉnh Sửa</Text>
                           </MenuOption>}
                           {userId === data.admin &&
                        <MenuOption style={{padding: 10,alignItems: 'center'}}
                            onSelect={() => setStar(data._id,!data.isStar)}
                           >
                              <Text  style={{fontSize: 18,fontWeight: '500'}}>{data.isStar ? "Bỏ Ưu Tiên" : "Ưu Tiên"}</Text>
                           </MenuOption>}
                        </MenuOptions>
                    </Menu>
                </View>
                
                <Text style={{marginTop: 3,fontSize: 17,color: 'grey',fontWeight:'500',flex: 1,flexWrap: 'wrap'}}>{data.tourtrip}</Text>
                <View style={{flexDirection: 'row',justifyContent:'space-between',paddingRight: 16,marginTop: 5}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 16,marginRight: 10,fontWeight: '500'}}>Giá:</Text>
                        <Text style={{fontSize: 16,fontWeight: '500'}}>{numeral(data.ticketPrice).format('0,0')} vnđ</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                         <Text style={{fontSize: 16,marginRight: 10,fontWeight: '500',color: "red"}}>Khởi Hành:</Text>
                        <Text style={{fontSize: 16,fontWeight: '500'}}>{moment(data.departureDate).format("DD/MM/YYYY")}</Text>

                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const _renderEmtyTour = () =>{
        return(
            <View style={{flex: 1,justifyContent:"center",alignItems:'center'}}>
                <Text style={{fontSize: 18,color:"grey"}}>Bạn chưa có Tour nào.!</Text>
            </View>
        )
    }
    const _onRefreshData = () =>{
        setRefreshing(true)
        fetchData()
    }
    const _renderListTour = () =>{
        return(
            <FlatList 
                style={{marginBottom: 68}}
                data={listTour}
                refreshControl={
                    <RefreshControl 
                        refreshing={isRefreshing}
                        onRefresh={() => _onRefreshData()}
                    />
                }
                showsVerticalScrollIndicator={false}
                keyExtractor={(item,index) => `${index}`}
                renderItem = {(item) => _renderItem(item)}
                ListEmptyComponent={() => _renderEmtyTour()}
            />
        )
    }

    const _renderAddTour = () =>{
        return(
            <TouchableOpacity activeOpacity={0.5} style={styles.addTour} 
                onPress={() => {
                    dispatch(clearAddUser())
                    SiteMap.showScreen(navigation,ScreenName.ADD_TRAVEL,{TOUR_ITEM: "add"})
                    }}>
                <Text style={{color: "white",fontSize: 20}}>Add Tour</Text>
             </TouchableOpacity>
        )
    }

    const _renderHoldTicketDialog = () =>{
        return (
            <Dialog.Container visible={openHoldTicketDialog}>
            <Dialog.Title>Số chỗ cần giữ</Dialog.Title>
                <TextInput
                        style={{borderColor: "#ccc",paddingHorizontal: 16,marginBottom: 16,fontSize:18}}
                        placeholder="Số vé muốn giữ"
                        autoFocus={true}
                        keyboardType="numeric"
                    />
            <Dialog.Button style={{color: 'red'}} label="Cancel" onPress={() => setOpenHoldTicketDialog(false)} />
            <Dialog.Button label="Confirm" onPress={() => setOpenHoldTicketDialog(false)}/>
        </Dialog.Container>
        )
    }

    const handleTicketBook = () =>{
        if(!tourChoose) {
            setOpenBookTicketDialog(false)
            setTicketBook("")
            return
        }
        if(ticketBook === "" || +ticketBook < 0) {
            setOpenBookTicketDialog(false)
            setTicketBook("")
            return
        }
        if(+ticketBook + tourChoose.tourBookedCount > tourChoose.ticketCount){
            alert("Không còn đủ vé cho tour này")
            setTicketBook("")
            return
        }
        const data = {
            tourId: tourChoose._id,
            countBooked: ticketBook
        }
        setOpenBookTicketDialog(false)
        dispatch(updateBookedTour(data))
    }
    const _renderBookTicktDialog = () =>{
        return(
            <Dialog.Container visible={openBookTicketDialog}>
            <Dialog.Title>Số chỗ cần đặt</Dialog.Title>
                <TextInput
                        style={{borderColor: "#ccc",paddingHorizontal: 16,marginBottom: 16,fontSize:18}}
                        value={ticketBook}
                        onChangeText={(text) => setTicketBook(text)}
                        placeholder="Số vé muốn đặt"
                        autoFocus={true}
                        keyboardType="numeric"
                    />
            <Dialog.Button style={{color: 'red'}} label="Cancel" onPress={() => setOpenBookTicketDialog(false)} />
            <Dialog.Button label="Confirm" onPress={() => handleTicketBook()}/>
        </Dialog.Container>
        )
    }

    return (
        <View style={styles.container}>
            {listTour && _renderListTour()}
            {_renderAddTour()}
            {_renderHoldTicketDialog()}
            {_renderBookTicktDialog()}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingVertical: 16,
    },
    addTour :{
        position: 'absolute',
        zIndex: 10,
        bottom: 20,
        left: 16,
        width: width - 32,
        height: 50,
        backgroundColor: "#4EC1E2",
        justifyContent: 'center',
        alignItems: 'center'
    },
    tourItem : {
        flex: 1,
        flexDirection:'column',
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderBottomColor: '#ccc',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    tourName:{
        fontSize: 16,
        fontWeight:'500'
    }
})

AddWordScreen.navigationOptions = () => ({
    title: "Danh Sách Tour"
})
export default AddWordScreen