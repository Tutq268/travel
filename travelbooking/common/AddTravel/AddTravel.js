import React,{useState,useEffect} from 'react'
import {View,Text,StyleSheet,SafeAreaView,TouchableOpacity,TextInput,Dimensions} from 'react-native'
import {Picker} from 'native-base'
import Icon from 'react-native-vector-icons/Ionicons'
import SiteMap from './../SiteMap'
import moment from 'moment'

const {width,height} = Dimensions.get("window")
const AddTravel = ({navigation}) =>{
    const [selectAirlines,setSelectAirlines] = useState("")
    const [dataTour,setDataTour] = useState(null)
    const [tourName,setTourName] = useState("")
    const [tourTrip,setTourTrip] = useState("")
    const [ticketCount,setTicketCount] = useState()
    const [ticketPrice,setTicketPrice] = useState()
    const [tourTime,setTourTime] = useState("")
    const [departureDate,setDepartureDate] = useState()
    const [users,setUsers] = useState([])

    useEffect(() =>{
       const dataTour = navigation.getParam("TOUR_ITEM")
       setDataTour(dataTour)
       if(dataTour === "add") return
       else{
            setTourName(dataTour.name_tour)
            setTourTrip(dataTour.tour_schedule)
            setTicketCount(dataTour.count_tour)
            setTicketPrice(dataTour.tour_price)
            setTourTime(dataTour.tour_time)
            setDepartureDate(dataTour.departure_date)
            setSelectAirlines(dataTour.airlines)
            setUsers(dataTour.users)
       }
    },[])

    const _renderHeader = () =>{
        console.log("data tour: ",dataTour)
        return(
            <View style={{flexDirection: "row",paddingHorizontal: 16, alignItems:'center'}}>
                <TouchableOpacity activeOpacity={0.5} onPress ={() =>SiteMap.goBack(navigation)}>
                    <Icon 
                        name="ios-arrow-round-back"
                        size={36}
                        color="grey"
                    />
                </TouchableOpacity>
                <Text style={{fontSize: 20,flex: 1,textAlign:'center'}}>
                       {dataTour === "add" ? "Add New Tour" : "Edit Tour"}
                    </Text>
            </View>
        )
    }
    const _renderAddNewTourButton = () =>{
        return(
            <View style={styles.addNewTourButton}>
                <TouchableOpacity activeOpacity={0.5} style={{alignItems:"center",backgroundColor: '#4EC1E2',width: width -64}}>
                    <Text style={{marginVertical: 12,marginHorizontal: 16,fontSize: 20,color:'white',fontWeight:'600'}}>
                        {dataTour === "add" ? "Add New Tour" : "Edit Tour"}
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    
    const _renderFormAddTravel = () =>{
        const options = ["Vietnam Airline", "Jetstar Pacific Airline","Vietjet Air","BamBoo Airways","Japan Airlines","Asiana Airlines","Air France"]
        return(
            <View style={{flex: 1, paddingHorizontal: 16,marginTop: 16}}>
                <View style={{paddingVertical: 10}}>
                    <Text style={{fontSize: 18,color: 'grey'}}>Tour Name : <Text style={{color: 'red'}}>*</Text></Text>
                    <TextInput
                        style={{paddingVertical: 8,borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: '#ccc',fontSize: 16}}
                        defaultValue={tourName}
                        onChangeText={text => setTourName(text)}
                    />
                </View>
                <View style={{paddingVertical: 10}}>
                    <Text style={{fontSize: 18,color: 'grey'}}>Tour Trip : <Text style={{color: 'red'}}>*</Text></Text>
                    <TextInput
                        style={{paddingVertical: 8,borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: '#ccc',fontSize: 16}}
                        defaultValue={tourTrip}
                        onChangeText={text => setTourTrip(text)}
                    />
                </View>
                <View style={{paddingVertical: 16,flexDirection: 'row'}}>
                    <Text style={{fontSize: 18,color: 'grey',marginRight: 16,flex: 0.5}}>Ticket Count : <Text style={{color: 'red'}}>*</Text></Text>
                    <TextInput
                        style={{borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: '#ccc',fontSize: 16,flex :0.5,textAlign:'center'}}
                        keyboardType="numeric"
                        defaultValue={ticketCount ? `${ticketCount}` : ""}
                        onChangeText={text => setTicketCount(text)}
                    />
                </View>
                <View style={{paddingVertical: 16,flexDirection: 'row'}}>
                    <Text style={{fontSize: 18,color: 'grey',marginRight: 16,flex: 0.5}}>Ticket Price : <Text style={{color: 'red'}}>*</Text></Text>
                    <TextInput
                        style={{borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: '#ccc',fontSize: 16,flex: 0.5,textAlign: 'center'}}
                        keyboardType="numeric"
                        defaultValue={ticketPrice ? `${ticketPrice}` : ""}
                        onChangeText={text => setTicketPrice(text)}
                    />
                </View>
                <View style={{paddingVertical: 16,flexDirection: 'row'}}>
                    <Text style={{fontSize: 18,color: 'grey',marginRight: 16,flex: 0.3}}>Tour time : <Text style={{color: 'red'}}>*</Text></Text>
                    <TextInput
                        style={{borderBottomWidth: StyleSheet.hairlineWidth,borderBottomColor: '#ccc',textAlign:'center',fontSize: 16,flex: 0.6}}
                        defaultValue={tourTime}
                        onChangeText={text => setTourTime(text)}
                    />
                    
                   
                </View>

                <View style={{paddingVertical: 16,flexDirection: 'row',alignItems:'center'}}>
                    <Text style={{fontSize: 18,color: 'grey',marginRight: 16}}>Departure date : <Text style={{color: 'red'}}>*</Text></Text>
                   <TouchableOpacity style={{justifyContent:"flex-end"}}>
                        <Icon 
                            name="ios-calendar"
                            size={25}
                            color="#4EC1E2"
                        />
                    </TouchableOpacity>
                  {departureDate && <Text style={{fontSize: 18,color: 'grey',marginLeft: 16}}>{moment(departureDate).format("DD/MM/YYYY")}</Text> }
                </View>

                <View style={{paddingBottom: 16,flexDirection: 'row',alignItems:'center'}}>
                    <Text style={{fontSize: 18,color: 'grey',marginTop: 16}}>Airlines : <Text style={{color: 'red'}}>*</Text></Text>
                    <Picker
                        mode="dropdown"
                        iosHeader="Select Airlines"
                        placeholder= {!selectAirlines ?  "Select Airlines" : selectAirlines}
                        iosIcon={<Icon name="ios-arrow-down" />}
                        selectedValue={selectAirlines}
                        onValueChange={(value) => setSelectAirlines(value)}
                        >
                        <Picker.Item label="Vietnam Airline" value="key0" />
                        <Picker.Item label="Jetstar Pacific Airline" value="key1" />
                        <Picker.Item label="Vietjet Air" value="key2" />
                        <Picker.Item label="BamBoo Airways" value="key3" />
                        <Picker.Item label="Japan Airlines" value="key4" />
                        <Picker.Item label="Asiana Airlines" value="key5" />
                        <Picker.Item label="Air France" value="key6" />
                    </Picker>
                </View>

                <View style={{paddingVertical: 16,flexDirection: 'row'}}>
                    <TouchableOpacity >
                        <Icon 
                            name="ios-person-add"
                            size={30}
                            color="#ccc"
                        />
                    </TouchableOpacity>
                    {users.length > 0 &&
                    <View style={{marginLeft: 32,flexDirection: 'row',flex: 1,flexWrap:'wrap' ,alignItems: 'center'}}>
                         {users.map((user,index) =>{
                            return(
                                <View key={index} 
                                    style={styles.userAddStyle}>
                                    <TouchableOpacity activeOpacity={0.6} style={styles.removeAddUser}>
                                        <Icon 
                                        name="ios-close-circle"
                                        color="grey"
                                        size={16}
                                        />
                                    </TouchableOpacity>
                                    <Text>{user.name}</Text>
                                </View>
                            )
                        })}
                    </View>}
                </View>
                {_renderAddNewTourButton()}
            </View>
        )
    }
    return(
         <SafeAreaView style={styles.container}>
            {dataTour && _renderHeader()}
            {dataTour && _renderFormAddTravel()}
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
        paddingHorizontal: 10,
        paddingVertical: 6,
        marginBottom: 16,
        borderColor: "#ccc",
        borderWidth: StyleSheet.hairlineWidth,
        marginRight: 16,
        borderRadius: 6
    },
    removeAddUser:{
        position: 'absolute',
        right: -8,
        top: -10
    },
    addNewTourButton: {
        position: 'absolute',
        bottom: 16,
        zIndex: 99,
        width: width,
        alignItems: 'center',
    }
})

export default AddTravel