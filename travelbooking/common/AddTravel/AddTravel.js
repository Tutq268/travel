import React,{useState,useEffect,useRef} from 'react'
import {View,Text,StyleSheet,SafeAreaView,TouchableOpacity,TextInput,Dimensions,ActivityIndicator, ScrollView,Platform} from 'react-native'
import {Picker} from 'native-base'
import { useSelector,useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import SiteMap from './../SiteMap'
import moment from 'moment'
import numeral from 'numeral'
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modalbox'
import * as ScreenName from './../../constant/ScreenName'
import {removeUser,addNewTour,editTour,clearAddUser,getListUserSuccess, addUser} from './../../action/TourAction'
import AsyncStorage from '@react-native-community/async-storage'
import API from './../../services/API'
import _ from 'lodash'
import {scaledSize} from './../../config/nomalize'
import DatePicker from 'react-native-datepicker'

const {width,height} = Dimensions.get("window")
const AddTravel = ({navigation}) =>{
    const [selectAirlines,setSelectAirlines] = useState("")
    const [dataTour,setDataTour] = useState(null)
    const [tourName,setTourName] = useState("")
    const [tourTrip,setTourTrip] = useState("")
    const [ticketCount,setTicketCount] = useState()
    const [ticketPrice,setTicketPrice] = useState()
    const [tourTime,setTourTime] = useState("")
    const [note,setNote] = useState("")
    const [departureDate,setDepartureDate] = useState()
    const [users,setUsers] = useState([])
    const [errAddTour,setErrAddTour] = useState([])
    const [isOpenModal,setOpenModal] = useState(false)
    const [date, setDate] = useState(new Date())
    const [userId,setUserId] = useState()
    const [addSuccess,setAddSuccess] = useState(false)
    const {userAdd} = useSelector(state => state.tour)
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(false)

    useEffect(() =>{
        if(addSuccess){
            navigation.goBack()
        }
    },[addSuccess])
    useEffect(() =>{
        const getUserId = async () =>{
            const userId = await AsyncStorage.getItem("userId")
            setUserId(userId)
        }
      
        getUserId()
    },[])
    useEffect(() =>{
        setUsers(userAdd)
    },[userAdd])

    useEffect(() =>{
       const dataTour = navigation.getParam("TOUR_ITEM")
       setDataTour(dataTour)
       if(dataTour === "add"){
        const getListUser = async () =>{
            const res = await API.getListUser()
            const data = res.data
            if(data.result === "ok"){
                dispatch(addUser(data.data))
                setUsers(data.data)
            }
        }
        getListUser()
       }
       else{
            setTourName(dataTour.tourname)
            setTourTrip(dataTour.tourtrip)
            setTicketCount(dataTour.ticketCount)
            setTicketPrice(dataTour.ticketPrice)
            setTourTime(dataTour.tourTime)
            setDepartureDate(dataTour.departureDate)
            setSelectAirlines(dataTour.airlines)
            setNote(dataTour.note)
            setUsers(dataTour.users)
            if(Platform.OS === "android"){
                setDate(new Date(dataTour.departureDate))
            }
       }
    },[])
    const _handleAddNewTour = () =>{
        const err = []
        if(tourName === "") err.push("tourName")
        // if(tourTrip === "") err.push("tourTrip")
        if(selectAirlines === "") err.push("selectAirlines")
        if(!ticketCount) err.push("ticketCount")
        if(!ticketPrice) err.push("ticketPrice")
        if(tourTime === "") err.push("tourTime")
        if(!departureDate) {
            if(Platform.OS === "android"){
                alert("Vui lòng chọn lại thời gian khởi hành")
                return
            }else{
                err.push("departureDate")
            }
        }

        if(err.length > 0){
            setErrAddTour(err)
        }
        else{
            let usersId = []
            if(userAdd.length > 0){
                userAdd.forEach(user =>{
                    usersId.push(user._id)
                })
            }

           const dataNewTour = {
            tourname: tourName,
            tourtrip : tourTrip,
            ticketCount : ticketCount,
            admin: userId,
            ticketPrice : ticketPrice.split(",").join(""),
            tourTime : tourTime,
            departureDate:departureDate,
            users: usersId,
            airlines: selectAirlines,
            note: note
           }
           setLoading(true)
           API.addNewTour(dataNewTour).then(res =>{
               const data = res.data
               if(data.result === "ok"){
                   dispatch(addNewTour(data.data))
                    setAddSuccess(true)
                    setLoading(false)
               }else{
                   alert(data.message)
                   setLoading(false)
               }
           }).catch(err =>{
               console.log(err)
           })
        }
    }
    const _handleEditTour = () =>{
        const dataTour = navigation.getParam("TOUR_ITEM")
        let editData = {}
        if(tourName !== dataTour.tourname){
            editData.tourname = tourName
        }
        if(tourTrip !== dataTour.tourtrip){
            editData.tourtrip = tourTrip
        }
        if(ticketCount !== dataTour.ticketCount){
            if(ticketCount < 0){
               alert("Số vé phải lớn hơn 0")
            }
            if(+ticketCount < dataTour.tourBookedCount){
                alert("Số vé đã chốt lớn hơn số vé muốn sửa")
                return
            }
            editData.ticketCount = ticketCount
        }
        if(ticketPrice !== dataTour.ticketPrice){
            if(ticketPrice < 0){
                alert("Giá vé phải lớn hơn 0 vnđ")
                return
            }
            editData.ticketPrice =ticketPrice.split(",").join("")
        }
        if(tourTime !== dataTour.tourTime){
            editData.tourTime = tourTime
        }
        if(departureDate !== dataTour.departureDate){
            editData.departureDate = departureDate
        } 
        if(selectAirlines !== dataTour.airlines){
            editData.airlines = selectAirlines
        } 
        if(users !== dataTour.users){
            let usersId = []
            if(userAdd.length > 0){
                userAdd.forEach(user =>{
                    usersId.push(user._id)
                })
            }
            editData.users = usersId
        }
        if(note !== dataTour.note){
            editData.note = note
        }
        if(_.isEmpty(editData)){
            alert("Bạn Chưa Thay Đổi Gì Hết")
            return
        }else{
            setLoading(true)
            editData._id = dataTour._id
            API.changTour(editData).then(res =>{
                const data = res.data
                if(data.result === "ok"){
                    dispatch(editTour(data.data))
                    dispatch(clearAddUser())
                    setLoading(false)
                    navigation.goBack()
                }else{
                    setLoading(false)
                    alert(data.message)
                }
            }).catch(err => {
                console.log(err)
            })
        }
    }
   
    const _renderHeader = () =>{
        return(
            <View style={{flexDirection: "row",paddingHorizontal: scaledSize(16), alignItems:'center'}}>
                <TouchableOpacity activeOpacity={0.5} onPress ={() =>SiteMap.goBack(navigation)}>
                    <Icon 
                        name="ios-arrow-round-back"
                        size={36}
                        color="grey"
                    />
                </TouchableOpacity>
                <Text style={{fontSize: scaledSize(20),flex: 1,textAlign:'center'}}>
                       {dataTour === "add" ? "Thêm tour mới" : "Chỉnh sửa"}
                    </Text>
            </View>
        )
    }
    const _renderAddNewTourButton = () =>{
        return(
            <View style={styles.addNewTourButton}>
                {loading ?
                <ActivityIndicator size="large" color="red" />
                :
                <TouchableOpacity 
                    activeOpacity={0.5} style={{alignItems:"center",backgroundColor: '#4EC1E2',marginHorizontal: scaledSize(32)}}
                    onPress ={() =>dataTour === "add" ? _handleAddNewTour() : _handleEditTour() }
                    >
                    <Text style={{marginVertical: scaledSize(12),marginHorizontal: scaledSize(16),fontSize: scaledSize(20),color:'white',fontWeight:'600'}}>
                        {dataTour === "add" ? "Thêm tour mới" : "Chỉnh sửa"}
                    </Text>
                </TouchableOpacity>
                }
            </View>
        )
    }
    const removeUserTour = userId =>{
        dispatch(removeUser(userId))
    }

    const _renderFormAddTravel = () =>{
        return(
            <View style={{flex: 1, paddingHorizontal: scaledSize(16),marginTop: scaledSize(16)}}>
                <View style={{paddingVertical: scaledSize(10)}}>
                    <Text style={{fontSize: scaledSize(18),color: errAddTour.includes("tourName") ? "red" : 'grey'}}>Tên Tour : <Text style={{color: 'red'}}>*</Text></Text>
                    <TextInput
                        style={{paddingVertical: scaledSize(8),borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: errAddTour.includes("tourName") ? "red" : '#ccc',fontSize: scaledSize(16)}}
                        defaultValue={tourName}
                        onChangeText={text => setTourName(text)}
                    />
                </View>
             <View style={{paddingVertical: scaledSize(10)}}>
                    <Text style={{fontSize: scaledSize(18),color:'grey'}}>Lịch Trình :</Text>
                    <TextInput
                        style={{paddingVertical: scaledSize(8),borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: '#ccc',fontSize: scaledSize(16)}}
                        defaultValue={tourTrip}
                        onChangeText={text => setTourTrip(text)}
                    />
                </View>
                <View style={{paddingVertical: scaledSize(14),flexDirection: 'row',alignItems: 'center'}}>
                    <Text style={{fontSize: scaledSize(18),color: errAddTour.includes("ticketCount") ? "red" :  'grey',marginRight: scaledSize(16),flex: 0.4}}>Tổng Số Chỗ : <Text style={{color: 'red'}}>*</Text></Text>
                    <TextInput
                        style={{borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: errAddTour.includes("ticketCount") ? "red" : '#ccc',fontSize: scaledSize(16),flex :0.6,textAlign:'center'}}
                        keyboardType="numeric"
                        defaultValue={ticketCount ? `${ticketCount}` : ""}
                        onChangeText={text => setTicketCount(text)}
                    />
                </View>
                <View style={{paddingVertical: scaledSize(14),flexDirection: 'row',alignItems: 'center'}}>
                    <Text style={{fontSize: scaledSize(18),color:errAddTour.includes("ticketPrice") ? "red" : 'grey',marginRight: scaledSize(16),flex: 0.4}}>Giá Tour : <Text style={{color: 'red'}}>*</Text></Text>
                    <TextInput
                        style={{borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: errAddTour.includes("ticketPrice") ? "red" : '#ccc',fontSize: scaledSize(16),flex: 0.6,textAlign: 'center'}}
                        keyboardType="numeric"
                        defaultValue={ticketPrice ? `${numeral(ticketPrice).format('0,0')}` : ""}
                        onChangeText={text => setTicketPrice(text)}
                    />
                </View>
                <View style={{paddingVertical: scaledSize(14),flexDirection: 'row',alignItems: 'center'}}>
                    <Text style={{fontSize: scaledSize(18),color: errAddTour.includes("tourTime") ? "red" : 'grey',marginRight: scaledSize(16),flex: 0.3}}>Thời Gian : <Text style={{color: 'red'}}>*</Text></Text>
                    <TextInput
                        style={{borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: errAddTour.includes("tourTime") ? "red" :  '#ccc',textAlign:'center',fontSize: scaledSize(16),flex: 0.6}}
                        defaultValue={tourTime}
                        onChangeText={text => setTourTime(text)}
                    />
                    
                   
                </View>

                <View style={{paddingVertical: scaledSize(14),flexDirection: 'row',alignItems:'center'}}>
                    <Text style={{fontSize: scaledSize(18),color:errAddTour.includes("departureDate") ? "red" : 'grey',marginRight: scaledSize(16)}}>Ngày Khởi Hành : <Text style={{color: 'red'}}>*</Text></Text>
                    {Platform.OS === "android"
                        &&
                        <DatePicker
                            style={{width: 200}}
                            date={date}
                            mode="date"
                            placeholder="select date"
                            format="DD-MM-YYYY"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"                           
                            onDateChange={(date) => {
                                setDepartureDate(moment(date, "DD-MM-YYYY").toDate().getTime())
                                setDate(date)
                                                            }}
                        />
                    }
                   {Platform.OS === "ios" && <TouchableOpacity 
                    style={{justifyContent:"flex-end"}}
                    onPress={() =>  setOpenModal(true)}
                    >
                        <Icon 
                            name="ios-calendar"
                            size={scaledSize(25)}
                            color="#4EC1E2"
                        />
                    </TouchableOpacity>}
                  {departureDate && Platform.OS === "ios" && <Text style={{fontSize: scaledSize(18),color: 'grey',marginLeft: scaledSize(16)}}>{moment(departureDate).format("DD/MM/YYYY")}</Text> }
                </View>
                <View style={{paddingVertical: scaledSize(14),flexDirection: 'row',alignItems: 'center'}}>
                    <Text style={{fontSize: scaledSize(16),color: 'grey',marginRight: scaledSize(20)}}>Note : </Text>
                    <TextInput
                        style={{borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: '#ccc',fontSize: scaledSize(16),flex :1}}
                        defaultValue={note}
                        multiline
                        onChangeText={text => setNote(text)}
                    />
                </View>
                <View style={{paddingBottom: scaledSize(16),flexDirection: 'row'}}>
                    <Text style={{fontSize: scaledSize(18),color:errAddTour.includes("selectAirlines")? "red" : 'grey',marginTop: scaledSize(16)}}>Hãng Hàng Không : <Text style={{color: 'red'}}>*</Text></Text>
                    <Picker
                        mode="dropdown"
                        iosHeader="Select Airlines"
                        placeholder= {!selectAirlines ?  "Select Airlines" : selectAirlines}
                        iosIcon={<Icon name="ios-arrow-down" />}
                        selectedValue={selectAirlines}
                        onValueChange={(value) => setSelectAirlines(value)}
                        >
                        <Picker.Item label="Vietnam Airline" value="Vietnam Airline" />
                        <Picker.Item label="Jetstar Pacific Airline" value="Jetstar Pacific Airline" />
                        <Picker.Item label="Vietjet Air" value="Vietjet Air" />
                        <Picker.Item label="BamBoo Airways" value="BamBoo Airways" />
                        <Picker.Item label="Japan Airlines" value="Japan Airlines" />
                        <Picker.Item label="Asiana Airlines" value="Asiana Airlines" />
                        <Picker.Item label="Air France" value="Air France" />
                    </Picker>
                </View>
                

                <View style={{paddingVertical: scaledSize(16),flexDirection: 'row'}}>
                    <TouchableOpacity onPress={() => SiteMap.showScreen(navigation,ScreenName.ADD_USER_TO_TOUR)}>
                        <Icon 
                            name="ios-person-add"
                            size={36}
                            color="#ccc"
                        />
                    </TouchableOpacity>
                    {users.length > 0 &&
                    <View style={{marginLeft: scaledSize(32),flexDirection: 'row',flex: 1,flexWrap:'wrap' ,alignItems: 'center'}}>
                         {users.map((user,index) =>{
                            return(
                                <View key={index} 
                                    style={styles.userAddStyle}>
                                    <TouchableOpacity 
                                        activeOpacity={0.6}
                                         style={styles.removeAddUser}
                                         onPress={() => removeUserTour(user._id)}
                                         >
                                        <Icon 
                                        name="ios-close-circle"
                                        color="grey"
                                        size= {scaledSize(16)}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{fontSize: scaledSize(16)}}>{user.username}</Text>
                                </View>
                            )
                        })}
                    </View>}
                </View>
                
                {_renderAddNewTourButton()}
            </View>
        )
    }
 
  
    const _renderModalAddTimeTour = () =>{
        return(
            <Modal 
                style={styles.modalAddTimer}
                position="center"
                isOpen={isOpenModal}
            >
             <DateTimePicker
                    style={{marginTop: scaledSize(32)}}
                    value={date}
                    mode="date"
                    onChange={(event,selectedDate) => {
                            setDate(selectedDate)
                    }}
                   
                    />
                {Platform.OS== "ios" &&    
                <View style={{marginTop: scaledSize(32),width: '100%',paddingHorizontal: scaledSize(64),flexDirection: 'row',justifyContent:"space-around"}}>
                    <TouchableOpacity 
                        onPress={() => {
                            setOpenModal(false)
                            setDepartureDate(date.getTime())
                        }}
                        style={{paddingHorizontal: scaledSize(32),paddingVertical: scaledSize(16),backgroundColor:'#4EC1E2'}}>
                        <Text style={{fontSize: scaledSize(16),color: "#fff"}}>Xác Nhận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                         style={{paddingHorizontal: scaledSize(32),paddingVertical: scaledSize(16),backgroundColor:'red'}}
                         onPress={() => {
                             setOpenModal(false)
                             setDate(new Date())
                         }}
                    >
                        <Text style={{fontSize: scaledSize(16),color: "#fff"}}>Cancle</Text>
                    </TouchableOpacity>
                </View>}
            </Modal>
           
        )
    }
    return(
         <SafeAreaView style={styles.container}>
             <ScrollView showsVerticalScrollIndicator={false}>
                {dataTour && _renderHeader()}
                {dataTour && _renderFormAddTravel()}
                {isOpenModal && _renderModalAddTimeTour()}
             </ScrollView>
        </SafeAreaView>
    )
}

AddTravel.navigationOptions = {
    headerShown : false
}

const styles = StyleSheet.create({
    container :{
        flex: 1,
        backgroundColor: "#fff"
    },
    userAddStyle:{
        paddingHorizontal: scaledSize(10),
        paddingBottom: scaledSize(6),
        marginBottom: scaledSize(16),
        borderColor: "#ccc",
        borderWidth: StyleSheet.hairlineWidth,
        marginRight: scaledSize(16),
        borderRadius: scaledSize(6)
    },
    removeAddUser:{
        position: 'absolute',
        right: scaledSize(-8),
        top: scaledSize(-10)
    },
    addNewTourButton: {
        marginTop: scaledSize(32),
        justifyContent:'center'
    },
    modalAddTimer:{
        height:  scaledSize(400),
        backgroundColor: "#ccc",
        // justifyContent: 'center',
        // alignItems: 'center'
    }
})

export default AddTravel