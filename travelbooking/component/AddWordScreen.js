import React,{useState,useEffect} from 'react'
import { View,Text,StyleSheet,TouchableOpacity,Dimensions,FlatList,TextInput } from 'react-native'
import moment from 'moment'
import numeral from 'numeral'
import * as ScreenName from './../constant/ScreenName'
import SiteMap from './../common/SiteMap'
import { Menu, MenuOption, MenuOptions, MenuTrigger, } from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/Ionicons'
import Dialog from "react-native-dialog"
import {getListTour,clearAddUser,updateBookedTour,addUser} from './../action/TourAction'
import { useDispatch,useSelector } from 'react-redux'

const {width,height} = Dimensions.get("window")
const AddWordScreen = ({navigation}) =>{
    const [openHoldTicketDialog,setOpenHoldTicketDialog] = useState(false)
    const [openBookTicketDialog,setOpenBookTicketDialog] = useState(false)
    const [ticketBook,setTicketBook] = useState("")
    const [tourChoose,setTourChoose] = useState()
    const {listTour} = useSelector(state => state.tour)
    const dispatch = useDispatch()
    useEffect(() =>{
        dispatch(getListTour())
    },[])
    const _renderTicketHold = (count) =>{
        return (
            <View style={{flexDirection: "row",marginRight: 16}}>
                <Text style={{color: "red"}}>{count} vé đang được giữ</Text>
            </View>
        )
    }
    const _renderItem = item =>{
        const data = item.item
        return(
            <TouchableOpacity 
                style={styles.tourItem}
                 activeOpacity={0.5}
                 onPress={() => SiteMap.showScreen(navigation,ScreenName.TOUR_DETAIL,{tourId: data._id})}
                 >
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={{fontSize: 15,color: "grey"}}>#{item.index + 1}</Text>
                        <Text style={{fontSize: 15,color: "grey"}}> - </Text>
                        <Text style={{fontSize: 15,color: "grey"}}>{moment(data.createAt).format("DD/MM/YYYY")}</Text>
                    </View>
                    {data.tour_hold > 0 && _renderTicketHold(data.tour_hold)}
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
                           <MenuOption style={{padding: 10,alignItems: 'center'}}
                            onSelect={() =>{
                                dispatch(addUser(data.users))
                                 SiteMap.showScreen(navigation,ScreenName.ADD_TRAVEL,{TOUR_ITEM: data})
                                }}
                           >
                              <Text  style={{fontSize: 18,fontWeight: '500'}}>Chỉnh Sửa</Text>
                           </MenuOption>
                        </MenuOptions>
                    </Menu>
                </View>
                <View style={{flexDirection: 'row',marginTop: 5,flex: 1,flexWrap:'wrap'}}>
                    <Text style={styles.tourName}>{data.tourname} - </Text>
                    <Text style={styles.tourName}>{data.tourTime}</Text>
                    <Text style={styles.tourName}> || </Text>
                    <View style={{flexDirection: 'row'}}>
                         <Text style={styles.tourName}>{data.tourBookedCount}</Text>
                         <Text style={styles.tourName}> of </Text>
                         <Text style={styles.tourName}>{data.ticketCount}</Text>
                    </View>
                </View>
                <Text style={{marginTop: 3,fontSize: 17,color: 'grey',fontWeight:'500',flex: 1,flexWrap: 'wrap'}}>{data.tourtrip}</Text>
                <View style={{flexDirection: 'row',justifyContent:'space-between',paddingRight: 16,marginTop: 5}}>
                     <Text style={{fontSize: 15,color:"grey"}}>Giá</Text>
                     <Text style={{fontSize: 15,fontWeight:'500'}}>{numeral(data.ticketPrice).format('0,0')} vnđ</Text>
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
    const _renderListTour = () =>{
        return(
            <FlatList 
                style={{marginBottom: 68}}
                data={listTour}
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
        padding: 16
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
        paddingHorizontal: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    tourName:{
        fontSize: 19,
        fontWeight:'500'
    }
})

AddWordScreen.navigationOptions = () => ({
    title: "Tour List"
})
export default AddWordScreen