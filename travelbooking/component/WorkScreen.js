import React,{useState,useEffect} from 'react'
import { View,Text,StyleSheet,TouchableOpacity,Dimensions,FlatList,Image,TextInput,KeyboardAvoidingView, ScrollView, Alert, Platform } from 'react-native'
import {useDispatch,useSelector} from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import Modal from 'react-native-modalbox'
import metric from './../config/metrics'
import Dialog from "react-native-dialog"
import SiteMap from './../common/SiteMap'
import {clearAddUser,removeUser,getUserInWork} from './../action/TourAction'
import {addWorkSuccess,getListWork,updateDeadlineSuceess,addSubtaskSuccess,changeStatusWorkSuccess,changeStatusSubTask} from './../action/WorkAction'
import DateTimePicker from '@react-native-community/datetimepicker';
import API from './../services/API'
import apiUrl from './../config/ApiUrl'
import {scaledSize} from './../config/nomalize'
import DatePicker from 'react-native-datepicker'


const WordScreen = ({navigation}) =>{
    const [isOpenModal,setOpenModal] = useState(false)
    const [isOpenModalWordItem,setOpenModalWordItem] = useState(false)
    const [itemWord,setItemWord] = useState(null)
    const [openDialogAddSub,setOpenDialogAddSub] = useState(false)
    const [date, setDate] = useState(new Date())
    const [deadline,setDeadline] = useState()
    const dispatch = useDispatch()
    const [statusDeadline,setStatusDeadline] = useState("add")
    const [workTitle,setworkTitle] = useState("")
    const [openChooseDate,setOpenChooseDate] = useState(false)
    const [dateEdit,setDateEdit] = useState(new Date())
    const [timeChoose,setTimeChoose] = useState()
    const [subTask,setSubTask] = useState("")

    const {userAdd} = useSelector(state => state.tour)
    const {listWord} = useSelector(state => state.work)
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

    const fetchData = async () =>{
        API.getAllWork().then(res =>{
            const data = res.data
            if(data.result === "ok"){
                dispatch(getListWork(data.data))
            }else{
                alert(data.message)
            }
        }).catch(err =>{
            alert(err)
        })
    }
    const _renderAvatarStaff = (users) =>{      
          return (
            <View style={{flexDirection: 'row',marginTop: 5}}>
                {
                    users.map((user,index) =>{
                        if(index < 2){
                            return (
                                <Image 
                                    key={index}
                                    source= {!user.avatar ? require("./../assets/default-avatar.png") :  {uri: apiUrl.host + data.avatar}}
                                    resizeMode="contain"
                                    style={
                                            {width: scaledSize(18),
                                            height:scaledSize(18),
                                            borderRadius: scaledSize(18),
                                            marginRight: scaledSize(6),
                                            borderWidth: StyleSheet.hairlineWidth}}
                                />
                            )
                        }else{
                            return(
                                <Text key={index} 
                                    style={{color: 'red',fontSize: scaledSize(12),marginTop: scaledSize(3)}}>
                                    +{users.length - 2}
                                </Text>
                            )
                        }
                        
                    })
                }
            </View>
           )
    }

 
    const chooseWordItem = item =>{
        setOpenModalWordItem(true)
        setItemWord(item)
    }

    const changeStatusWork = (workId,status) =>{
        const param ={
            _id: workId,
            status_work: status
        }
       API.changeStatusWork(param).then(res =>{
           const data = res.data
           if(data.result === "ok"){
                dispatch(changeStatusWorkSuccess(param))
           }else{
               alert(data.message)
           }
       }).catch(err =>{
           alert(err)
       })
    }

    const _renderItem = (item) =>{
        const data = item.item
       return(
           <TouchableOpacity activeOpacity={0.8} style={styles.wordItem}
             onPress={() => {
                    chooseWordItem(data)
                    dispatch(getUserInWork(data.users))
                }}
             >
               <TouchableOpacity 
                style={{flex: 0.1}}
                onPress={() => changeStatusWork(data._id,data.status_work === "pending" ? "done" : "pending")}
                >
                    {data.status_work === "pending" ?
                    <Icon 
                        name="ios-radio-button-off"
                        size={26}
                        /> :
                    <Icon 
                        name ="ios-checkmark-circle-outline"
                        size={26}
                        color="green"
                        />
                        }
               </TouchableOpacity>
              
               <View style={{flexDirection:'column',flex: 0.7}}>
                    <Text style={{fontSize: scaledSize(16),fontWeight:'400'}}>{data.work_title}</Text>
                    <View style={{flexDirection: 'row',marginTop: scaledSize(8)}}>
                        <Icon 
                            name="ios-calendar"
                            size={15}
                            color="#ccc"
                            
                        />
                       {data.deadline && <Text style={{color: "red",fontSize: scaledSize(13),marginLeft: scaledSize(8)}}>{moment(data.deadline).format("MMM Do YY")}</Text>}
                    </View>
               </View>
               <View style={{flex: 0.2,justifyContent:'center',alignItems:'center'}}>
                    {data.users.length > 0 && _renderAvatarStaff(data.users)}
                
               </View>
           </TouchableOpacity>
       )
    }
    const chooseDate = () =>{
        if(statusDeadline === "add"){
            setOpenChooseDate(false)
            setDeadline(date.getTime())
         }else{
             if(dateEdit === timeChoose){
                setOpenChooseDate(false)
                setDateEdit(new Date())
                return
             }
             else{
                 const param = {
                     _id: itemWord._id,
                     deadline: dateEdit.getTime()
                    }
                 API.updateTimerWorkItem(param).then(res =>{
                     const data = res.data
                     if(data.result === "ok"){
                        dispatch(updateDeadlineSuceess(param))
                        const newItemWork = {
                            ...itemWord,
                            deadline: param.deadline
                        }
                        setItemWord(newItemWork)
                        setOpenChooseDate(false)
                        setDateEdit(new Date())
                     }else{
                         alert(data.message)
                     }
                 }).catch(err =>{
                     alert(err)
                 })
             }
           
         }
    }
    const _renderModalAddTimeWork = () =>{
        return(
            <Modal 
                style={styles.modalAddTimer}
                position="center"
                isOpen={openChooseDate}
                onClosed={() => setOpenChooseDate(false)}
            >
                <DateTimePicker
                    style={{marginTop: scaledSize(32)}}
                    value={statusDeadline === "add" ? date : dateEdit}
                    // minimumDate={date}
                    mode="date"
                    display="default"
                    onChange={(event,selectedDate) =>{
                                if(statusDeadline === "add"){
                                    setDate(selectedDate)
                                }else{
                                    setDateEdit(selectedDate)
                                }
                              
                            }}
                />
                <View style={{marginTop: scaledSize(32),width: '100%',paddingHorizontal: scaledSize(64),flexDirection: 'row',justifyContent:"space-around"}}>
                    <TouchableOpacity 
                     onPress={() => chooseDate()}
                        style={{paddingHorizontal: scaledSize(32),paddingVertical: scaledSize(16),backgroundColor:'#4EC1E2'}}>
                        <Text style={{fontSize: scaledSize(16),color: "#fff"}}>Xác Nhận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                         style={{paddingHorizontal: scaledSize(32),paddingVertical: scaledSize(16),backgroundColor:'red'}}
                         onPress={() => {
                             if(statusDeadline === "add"){
                                setOpenChooseDate(false)
                                setDate(new Date())
                             }else{
                                setOpenChooseDate(false)
                                setDateEdit(new Date())
                             }
                           
                        }}
                    >
                        <Text style={{fontSize: scaledSize(16),color: "#fff"}}>Cancle</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        )
    }
    const removeUserTour = userId =>{
        dispatch(removeUser(userId))
    }

    const handleAddNewWork = () =>{
        if(workTitle === ""){
            alert("bạn chưa nhập tên công việc")
            return
        }
        let dataAddNewWork = {
            work_title: workTitle
        }
        if(deadline){
            dataAddNewWork.deadline = deadline
        }
        if(userAdd.length > 0){
            let userIds = []
            userAdd.map(user =>{
                userIds.push(user._id)
            })
            dataAddNewWork.users = userIds
        }
        API.createNewWork(dataAddNewWork).then(res =>{
            const data = res.data
            if(data.result === "ok"){
                dispatch(addWorkSuccess(data.data))
                setOpenModal(false)
            }
            else{
                alert(data.message)
            }
        }).catch(err => {
           alert(err)
        })
    }

    const _renderMdalAddWord = () =>{
        return(
            <Modal 
                style={styles.modalAddWord}
                position="bottom"
                isOpen={isOpenModal}
                onClosed={() => setOpenModal(false)}
            >
                    <TextInput
                        style={{
                                height: scaledSize(40),
                                borderColor: "#ccc",
                                marginTop: scaledSize(8),
                                marginLeft: scaledSize(16),
                                marginRight:scaledSize(16),
                                color:"#4EC1E2",
                                fontSize:scaledSize(15)
                            }}
                        placeholder="Add a word"
                        // autoFocus={true}
                        value={workTitle}
                        onChangeText={text => setworkTitle(text)}
                        />
                    <View style={{
                            flexDirection: 'row',
                            marginHorizontal: scaledSize(16),
                            justifyContent:"space-between",
                            alignItems:'center'}}>
                        <View style={{flexDirection:'row'}}>
                           {Platform.OS ==="ios" && <TouchableOpacity 
                                style={styles.addDate}
                                onPress={() => {
                                    setOpenChooseDate(true)
                                    setStatusDeadline("add")
                                }}>
                                <Icon
                                    name="ios-calendar"
                                    size={26}
                                    color="#ccc"
                                />
                                <Text style={{marginLeft: scaledSize(10),color:"grey"}}>{!deadline ? "No date" : moment(deadline).format("DD/MM/YYYY")}</Text>
                            </TouchableOpacity>}
                            {Platform.OS === "android" &&
                            <TouchableOpacity onPress={() => {setStatusDeadline("add")} }>
                                <DatePicker
                                    style={{width: 200}}
                                    date={date}
                                    mode="date"
                                    placeholder="select date"
                                    format="DD-MM-YYYY"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"                           
                                    onDateChange={(d) => {
                                        // if(moment(date).format("DD-MM-YYYY") === d){
                                        //     alert("123")
                                        // }
                                           setDate(d)
                                           setDeadline(moment(d, "DD-MM-YYYY").toDate().getTime())
                                    
                                       }
                                }
                                    />
                            </TouchableOpacity>
                                
                            
                            }
                            
                            <TouchableOpacity 
                                style={StyleSheet.flatten([styles.addDate,{marginLeft: scaledSize(8)}])}
                                onPress={() =>{
                                         SiteMap.showScreen(navigation,"AddUserWork",{"SCREEN": {name: "work",workId: null}})
                                        }}
                                >
                                    <Icon 
                                        name="ios-person-add"
                                        size={scaledSize(25)}
                                        color="#ccc"
                                        />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => handleAddNewWork()}
                            style={{
                                width: scaledSize(26),
                                height:scaledSize(26),
                                borderRadius: scaledSize(26),
                                backgroundColor: "#4EC1E2",
                                justifyContent:'center',
                                alignItems:'center'}}>
                            <Icon 
                                name="md-arrow-up"
                                size={20}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                   {userAdd.length >0 && 
                        <View style={{padding: scaledSize(16),flexDirection: "row",flex: 1,flexWrap: 'wrap'}}>
                            {userAdd.map(user =>{
                                return(
                                    <View style={styles.userAddStyle} key={user._id}>
                                        <TouchableOpacity 
                                            activeOpacity={0.6}
                                            style={styles.removeAddUser}
                                            onPress={() => removeUserTour(user._id)}
                                         >
                                        <Icon 
                                        name="ios-close-circle"
                                        color="grey"
                                        size={16}
                                        />
                                        </TouchableOpacity>
                                        <Text style={{fontSize: scaledSize(16)}}>{user.username}</Text>
                                    </View>
                                )
                            })}
                        </View>}
            </Modal>
        )
    }

    const handleChangeStatusSubtask = (status,subTaskId) =>{
        const param ={
            workId: itemWord._id,
            subTaskId: subTaskId,
            status: status
        }
        API.changeStatusSubTask(param).then(res =>{
            const data = res.data
            if(data.result === "ok"){
                setItemWord(data.data)
                dispatch(changeStatusSubTask(data.data))
            }else{
                alert(data.message)
            }

        }).catch(err =>{
            alert(err)
        })
    }

    const _renderModalWordItem = () =>{
        if(!itemWord){
            return(
               <></>
            )
        }else{
            return (
                <Modal
                    style={styles.modalWordItem}
                    position="bottom"
                    isOpen={isOpenModalWordItem}
                    onClosed={() => setOpenModalWordItem(false)}
                    >
                    <View style={styles.wordItemContainer}>
                        <TouchableOpacity activeOpacity={0.5} style={{width: '100%',alignItems: 'flex-end'}} onPress={() => setOpenModalWordItem(false)}>
                            <Icon 
                                name="ios-close-circle"
                                color="#ccc"
                                size={30}
                                />
                        </TouchableOpacity>
                        <View style={{flexDirection: 'row',borderBottomColor: '#ccc',borderBottomWidth: StyleSheet.hairlineWidth,paddingBottom: scaledSize(16)}}>
                            <TouchableOpacity style={{marginTop: scaledSize(8)}}>
                                <Icon 
                                    name="ios-radio-button-off"
                                    size={28}
                                    />
                            </TouchableOpacity>
                            <View style={{flexDirection:'column',marginLeft: scaledSize(16)}}>
                                <Text style={{fontSize: scaledSize(18),fontWeight:'400'}}>{itemWord.work_title}</Text>
                                <View style={{flexDirection:'row',marginTop: scaledSize(8)}}>
                                {Platform.OS ==="ios" && (itemWord.deadline ?  
                                    <TouchableOpacity 
                                        style={StyleSheet.flatten([styles.word_item_time])}
                                        onPress={() => {
                                            setOpenChooseDate(true)
                                            setStatusDeadline("edit")
                                            setTimeChoose(itemWord.deadline)
                                            setDateEdit(itemWord.deadline)
                                        }}
                                        >
                                        <Icon 
                                            name="ios-calendar"
                                            size={15}
                                            color="red"
                                        />
                                        <Text style={{color: "red",fontSize: scaledSize(13),marginLeft: scaledSize(8)}}>{moment(itemWord.deadline).format("MMM DD")}</Text>
                                  
                                    </TouchableOpacity> :
                                    <TouchableOpacity
                                        onPress={() => {
                                            setOpenChooseDate(true)
                                            setStatusDeadline("edit")
                                        }}
                                    >
                                        <Icon 
                                            name="ios-calendar"
                                            size={26}
                                            color="#ccc"
                                            />    
                                    </TouchableOpacity>)
                                    }
                                        {Platform.OS === "android" &&
                                        <DatePicker
                                            style={{width: 150,height: 30}}
                                            date={new Date(itemWord.deadline)}
                                            mode="date"
                                            placeholder="select date"
                                            format="DD-MM-YYYY"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"                           
                                            onDateChange={(date) => {
                                              if(moment(itemWord.deadline).format("DD-MM-YYYY") === date){
                                                    return
                                                }else{
                                                    const param = {
                                                        _id: itemWord._id,
                                                        deadline: moment(date, "DD-MM-YYYY").toDate().getTime()
                                                       }
                                                    API.updateTimerWorkItem(param).then(res =>{
                                                        const data = res.data
                                                        if(data.result === "ok"){
                                                           dispatch(updateDeadlineSuceess(param))
                                                           const newItemWork = {
                                                               ...itemWord,
                                                               deadline: param.deadline
                                                           }
                                                           setItemWord(newItemWork)
                                                           setDateEdit(new Date())
                                                        }else{
                                                            alert(data.message)
                                                        }
                                                    }).catch(err =>{
                                                        alert(err)
                                                    })
                                                }
                                            }}
                                        />
                                        }
                                    {userAdd.length > 0 &&                                           
                                    <View style={StyleSheet.flatten([styles.word_item_time,{marginLeft: 8,alignItems:'center'}])}>
                                        {
                                            userAdd.map((user,index) =>{
                                                if(index < 2){
                                                    return(
                                                        <Image 
                                                            key={index}
                                                            source={!user.avatar ? require("./../assets/default-avatar.png") : {uri : apiUrl.host + user.avatar}}
                                                            style={{
                                                                width: scaledSize(18),
                                                                height: scaledSize(18),
                                                                 borderRadius: scaledSize(18),
                                                                 marginRight: scaledSize(2)}}
                                                        />
                                                    )
                                                }else{
                                                    return(
                                                    <Text key={index}
                                                         style={{
                                                             color: "red",
                                                             fontSize: scaledSize(12),
                                                             marginLeft: scaledSize(3)
                                                            }}>+{itemWord.users.length - 2}</Text>
                                                    )
                                                }
                                            })
                                        }
                                    </View>}
                                </View>
                                <View style={{flexDirection: 'row',marginTop: scaledSize(16),marginLeft: scaledSize(8)}}>
                                    <TouchableOpacity onPress={() =>SiteMap.showScreen(navigation,"AddUserWork",{"SCREEN": {name: "work",workId: itemWord._id}})}>
                                        <Icon 
                                            name="ios-person-add"
                                            color="#ccc"
                                            size={28}
                                            style={{marginRight: scaledSize(20)}}
                                            />
                                    </TouchableOpacity>
                                   
                                    <TouchableOpacity>
                                        <Icon 
                                            name="ios-bookmark"
                                            color="#ccc"
                                            size={scaledSize(28)}
                                            style={{marginRight: scaledSize(20)}}
                                            />
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity>
                                        <Icon
                                            name="ios-chatboxes"
                                            color="#ccc"
                                            size={scaledSize(28)}
                                            style={{marginRight: scaledSize(20)}}
                                            />
                                    </TouchableOpacity>
                                   
                                </View>
                            </View>
                            
                        </View>

                        <View style={{marginTop: scaledSize(8),flexDirection: 'row',flex:1}}>
                            <Icon 
                                name="ios-git-merge"
                                size={30}
                            />
                            <View style={{flexDirection: 'column',marginLeft: 16,flex: 1}}>
                                <Text style={{fontSize: scaledSize(17),fontWeight:'500'}}>Sub-tasks</Text>
                                <TouchableOpacity
                                     activeOpacity={0.5}
                                     style={{flexDirection: 'row',marginTop: scaledSize(8),alignItems: 'center'}}
                                     onPress={() => setOpenDialogAddSub(true)}
                                     >
                                    <Icon 
                                        name="ios-add"
                                        size={scaledSize(23)}
                                        style={{marginTop: scaledSize(2)}}
                                        color="grey"
                                    />
                                    <Text style={{marginLeft: scaledSize(16),color: "grey",fontSize: scaledSize(17)}}>Add Sub-task</Text>
                                </TouchableOpacity>
                               {itemWord.subs.length > 0 &&
                                <View style={{flex: 1}}>
                                    <FlatList 
                                        data={itemWord.subs}
                                        showsVerticalScrollIndicator={false}
                                        keyExtractor={(item,index)=> `${index}`}
                                        renderItem = {(item) =>{
                                            const sub = item.item
                                            return(
                                                <TouchableOpacity 
                                                    activeOpacity={1} 
                                                    style={{
                                                        flexDirection: "row",
                                                        alignItems:'center',
                                                        paddingVertical: scaledSize(8),
                                                        borderBottomColor: '#ccc',
                                                        borderBottomWidth: StyleSheet.hairlineWidth}}
                                                    onPress={() => handleChangeStatusSubtask(sub.status === "done" ? "pending" : "done",sub._id)}
                                                    >
                                                    <Icon 
                                                        name={sub.status === "done" ? "ios-checkmark-circle" : "ios-radio-button-off"}
                                                        size={23}
                                                        color="grey"
                                                    />
                                                    <Text
                                                        style={{marginLeft: scaledSize(16),
                                                                fontSize: scaledSize(16),
                                                                textDecorationLine: sub.status === 'done' ? "line-through" : "none",
                                                                color: sub.status === 'done' ? "grey" : "black"
                                                                }}>
                                                            {sub.sub_title}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        }}
                                    />
                                </View>}
                            </View>
                        </View>
                    </View>
                </Modal>
            )
        }
    }

    const handleAddSubTask = () =>{
        // setOpenDialogAddSub(false)
        if(subTask === ""){
            return
        }
        const param = {
            _id: itemWord._id,
            taskTitle : subTask
        }
        API.addSubTask(param).then(res =>{
            const data = res.data
            if(data.result === "ok"){
                dispatch(addSubtaskSuccess(data.data))
                const newItemWork = {
                    ...itemWord,
                    subs: itemWord.subs.concat(data.data)
                }
                setItemWord(newItemWork)
                setSubTask("")
                setOpenDialogAddSub(false)
            }else{
                alert(data.message)
            }
        }).catch(err =>{
            alert(err)
        })
    }

    const _renderDialogAddSub = () =>{
        return(
            <Dialog.Container visible={openDialogAddSub}>
                <Dialog.Title>Type new sub-task</Dialog.Title>
                    <TextInput
                            style={{
                                borderColor: "#ccc",
                                paddingHorizontal: scaledSize(16),
                                marginBottom: scaledSize(16),
                                fontSize:scaledSize(18)
                            }}
                            value={subTask}
                            placeholder="Sub-task"
                            onChangeText={text => setSubTask(text)}
                            autoFocus={true}
                        />
                <Dialog.Button style={{color: 'red'}} label="Cancel"
                                 onPress={() => {
                                  setOpenDialogAddSub(false)
                                  setSubTask("")
                                  }} />
                <Dialog.Button label="Add" onPress={() => handleAddSubTask()}/>
            </Dialog.Container>
        )
    }

    const renderAddWordButton = () =>{
        return (
                <TouchableOpacity
                     style={styles.addWord}
                      activeOpacity={0.5} 
                      onPress={() => {
                          setOpenModal(true)
                          setworkTitle("")
                          setDate(new Date())
                          setDeadline(null)
                          dispatch(clearAddUser())
                          }}>
                    <Icon 
                        name="ios-add"
                        size={30}
                        color="white"
                        />
                </TouchableOpacity>
        )
    }
 
    return (
            <View style={styles.container}>
                    {!isOpenModal && !isOpenModalWordItem && renderAddWordButton()}
                    {listWord &&
                    <View style={styles.listWord}>
                        <FlatList 
                            data={listWord}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(value, index) => `${index}`}
                            renderItem={(item) => _renderItem(item)}
                        />
                    </View>
                    }
                        {_renderMdalAddWord()}
                        {_renderModalWordItem()}
                        {_renderDialogAddSub()}
                        {_renderModalAddTimeWork()}
            </View>
      
    )
}
WordScreen.navigationOptions = () =>({
    title: "List Word"
})
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    addWord: {
        zIndex: 10,
        position: 'absolute',
        bottom: scaledSize(50),
        right: scaledSize(50),
        width: scaledSize(60),
        height: scaledSize(60),
        borderRadius: scaledSize(60),
        backgroundColor: "#4EC1E2",
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        shadowColor: "#4EC1E2",
        justifyContent: "center",
        alignItems:"center"
    },
    listWord: {
        padding: scaledSize(16)
    },
    wordItem: {
        flex: 1,
        flexDirection: "row",
        alignItems:"flex-start",
        paddingTop: scaledSize(8),
        paddingBottom: scaledSize(12),
        borderBottomColor: '#ccc',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    modalAddWord:{
        height: metric.DEVIDE_HEIGHT*0.38,
        backgroundColor: '#fff',
        borderTopLeftRadius: scaledSize(10),
        borderTopRightRadius: scaledSize(10)
    },
    modalWordItem :{
        height: metric.DEVIDE_HEIGHT*0.56,
        backgroundColor: '#fff',
        borderTopLeftRadius: scaledSize(10),
        borderTopRightRadius: scaledSize(10)
    },
    addDate:{
        flexDirection:"row",
        borderRadius: 8,
        paddingHorizontal: scaledSize(12),
        paddingVertical: scaledSize(3),
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#ccc",
        justifyContent:'center',
        alignItems:'center'
    },
    wordItemContainer:{
        flex: 1,
        padding: scaledSize(16),
    },
    word_item_time: {
        paddingHorizontal:scaledSize(10),
        paddingVertical:scaledSize(8),
        borderRadius: scaledSize(8),
        flexDirection: 'row',
        borderColor: '#ccc',
        borderWidth: StyleSheet.hairlineWidth
    },
    modalAddTimer: {
        height: scaledSize(400),
        backgroundColor: "#ccc"
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
})
export default WordScreen