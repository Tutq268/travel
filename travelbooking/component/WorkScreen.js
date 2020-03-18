import React,{useState} from 'react'
import { View,Text,StyleSheet,TouchableOpacity,Dimensions,FlatList,Image,TextInput,KeyboardAvoidingView, ScrollView } from 'react-native'
import { HeaderTitle } from 'react-navigation-stack'
import {wordData} from './../common/fakeData'
import Icon from 'react-native-vector-icons/Ionicons'
import moment from 'moment'
import Modal from 'react-native-modalbox'
import metric from './../config/metrics'
import Dialog from "react-native-dialog"
const WordScreen = ({navigation}) =>{
    const [isOpenModal,setOpenModal] = useState(false)
    const [titleNewTask,setTitleNewTask] = useState("")
    const [isOpenModalWordItem,setOpenModalWordItem] = useState(false)
    const [itemWord,setItemWord] = useState(null)
    const [openDialogAddSub,setOpenDialogAddSub] = useState(false)
    const _renderAvatarStaff = (users) =>{      
          return (
            <View style={{flexDirection: 'row',marginTop: 5}}>
                {
                    users.map((user,index) =>{
                        if(index < 2){
                            return (
                                <Image 
                                key={index}
                                source={{uri: user.avatar}}
                                resizeMode="contain"
                                style={{width: 18,height:18,borderRadius: 18,marginRight: 3}}
                               />
                            )
                        }else{
                            return(
                                <Text key={index} style={{color: 'red',fontSize: 12,marginTop: 3}}>+{users.length - 2}</Text>
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

    const _renderItem = (item) =>{
        const data = item.item
       return(
           <TouchableOpacity activeOpacity={0.8} style={styles.wordItem} onPress={() => chooseWordItem(data)}>
               <TouchableOpacity style={{flex: 0.1}}>
                <Icon 
                    name="ios-radio-button-off"
                    size={26}
                    />
               </TouchableOpacity>
              
               <View style={{flexDirection:'column',flex: 0.7}}>
                    <Text style={{fontSize: 16,fontWeight:'400'}}>{data.title}</Text>
                    <View style={{flexDirection: 'row',marginTop: 8}}>
                        <Icon 
                            name="ios-calendar"
                            size={15}
                            color="#ccc"
                            
                        />
                        <Text style={{color: "red",fontSize: 13,marginLeft: 8}}>{moment(data.createAt).format("MMM Do YY")}</Text>
                    </View>
               </View>
               <View style={{flex: 0.2,justifyContent:'center',alignItems:'center'}}>
                    {data.users.length > 0 && _renderAvatarStaff(data.users)}
                
               </View>
           </TouchableOpacity>
       )
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
                        style={{height: 40,borderColor: "#ccc",marginTop: 8,marginLeft: 16,marginRight:16,color:"#4EC1E2",fontSize:15}}
                        placeholder="Add a word"
                        autoFocus={true}
                        value={titleNewTask}
                        onChangeText={text => setTitleNewTask(text)}
                        />
                    <View style={{flexDirection: 'row',marginHorizontal: 16,justifyContent:"space-between",alignItems:'center'}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={styles.addDate}>
                                <Icon 
                                    name="ios-calendar"
                                    size={26}
                                    color="#ccc"
                                />
                                <Text style={{marginLeft: 10,color:"grey"}}>No date</Text>
                            </View>
                            <View style={StyleSheet.flatten([styles.addDate,{marginLeft: 8}])}>
                                    <Icon 
                                        name="ios-person-add"
                                        size={18}
                                        color="#ccc"
                                        />
                            </View>
                        </View>
                        <TouchableOpacity style={{width: 26,height:26,borderRadius: 26,backgroundColor: "#4EC1E2",justifyContent:'center',alignItems:'center'}}>
                            <Icon 
                                name="md-arrow-up"
                                size={20}
                                color="white"
                            />
                        </TouchableOpacity>
                        
                        
                    </View>
              
            </Modal>
        )
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
                        <View style={{flexDirection: 'row',borderBottomColor: '#ccc',borderBottomWidth: StyleSheet.hairlineWidth,paddingBottom: 16}}>
                            <TouchableOpacity style={{marginTop: 8}}>
                                <Icon 
                                    name="ios-radio-button-off"
                                    size={28}
                                    />
                            </TouchableOpacity>
                            <View style={{flexDirection:'column',marginLeft: 16}}>
                                <Text style={{fontSize: 20,fontWeight:'400'}}>{itemWord.title}</Text>
                                <View style={{flexDirection:'row',marginTop: 8}}>
                                    <View style={StyleSheet.flatten([styles.word_item_time])}>
                                        <Icon 
                                            name="ios-calendar"
                                            size={15}
                                            color="red"
                                        />
                                         <Text style={{color: "red",fontSize: 13,marginLeft: 8}}>{moment(itemWord.createAt).format("MMM DD")}</Text>
                                    </View>

                                    <View style={StyleSheet.flatten([styles.word_item_time,{marginLeft: 8,alignItems:'center'}])}>
                                        {
                                            itemWord.users.map((user,index) =>{
                                                if(index < 2){
                                                    return(
                                                        <Image 
                                                            key={index}
                                                            source={{uri: user.avatar}}
                                                            style={{width: 18,height: 18, borderRadius: 18,marginRight: 2}}
                                                        />
                                                    )
                                                }else{
                                                    return(
                                                    <Text key={index} style={{color: "red",fontSize: 12,marginLeft: 3}}>+{itemWord.users.length - 2}</Text>
                                                    )
                                                }
                                            })
                                        }
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row',marginTop: 16,marginLeft: 8}}>
                                    <TouchableOpacity>
                                        <Icon 
                                            name="ios-person-add"
                                            color="#ccc"
                                            size={22}
                                            style={{marginRight: 16}}
                                            />
                                    </TouchableOpacity>
                                   
                                    <TouchableOpacity>
                                        <Icon 
                                            name="ios-bookmark"
                                            color="#ccc"
                                            size={22}
                                            style={{marginRight: 16}}
                                            />
                                    </TouchableOpacity>
                                    
                                    <TouchableOpacity>
                                        <Icon 
                                            name="ios-chatboxes"
                                            color="#ccc"
                                            size={22}
                                            style={{marginRight: 16}}
                                            />
                                    </TouchableOpacity>
                                   
                                </View>
                            </View>
                            
                        </View>

                        <View style={{marginTop: 8,flexDirection: 'row',flex:1}}>
                            <Icon 
                                name="ios-git-merge"
                                size={30}
                            />
                            <View style={{flexDirection: 'column',marginLeft: 16,flex: 1}}>
                                <Text style={{fontSize: 17,fontWeight:'500'}}>Sub-tasks</Text>
                                <TouchableOpacity
                                     activeOpacity={0.5} 
                                     style={{flexDirection: 'row',marginTop: 8,alignItems: 'center'}}
                                     onPress={() => setOpenDialogAddSub(true)}
                                     >
                                    <Icon 
                                        name="ios-add"
                                        size={23}
                                        style={{marginTop: 2}}
                                        color="grey"
                                    />
                                    <Text style={{marginLeft: 16,color: "grey",fontSize: 17}}>Add Sub-task</Text>
                                </TouchableOpacity>
                               
                                <View style={{flex: 1}}>
                                    <FlatList 
                                        data={itemWord.subs}
                                        showsVerticalScrollIndicator={false}
                                        keyExtractor={(item,index)=> `${index}`}
                                        renderItem = {(item) =>{
                                            const sub = item.item
                                            return(
                                                <TouchableOpacity activeOpacity={1} style={{flexDirection: "row",alignItems:'center',paddingVertical: 8,borderBottomColor: '#ccc',borderBottomWidth: StyleSheet.hairlineWidth}}>
                                                    <Icon 
                                                        name={sub.status === "done" ? "ios-checkmark-circle" : "ios-radio-button-off"}
                                                        size={23}
                                                        color="grey"
                                                    />
                                                    <Text 
                                                        style={{marginLeft: 16,
                                                                fontSize: 16,
                                                                textDecorationLine: sub.status === 'done' ? "line-through" : "none",
                                                                color: sub.status === 'done' ? "grey" : "black"
                                                                }}>
                                                            {sub.title}
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            )
        }
    }

    const _renderDialogAddSub = () =>{
        return(
            <Dialog.Container visible={openDialogAddSub}>
                <Dialog.Title>Type new sub-task</Dialog.Title>
                    <TextInput
                            style={{borderColor: "#ccc",paddingHorizontal: 16,marginBottom: 16,fontSize:18}}
                            placeholder="Sub-task"
                            autoFocus={true}
                        />
                <Dialog.Button style={{color: 'red'}} label="Cancel" onPress={() => setOpenDialogAddSub(false)} />
                <Dialog.Button label="Add" onPress={() => setOpenDialogAddSub(false)}/>
            </Dialog.Container>
        )
    }

    const renderAddWordButton = () =>{
        return (
                <TouchableOpacity style={styles.addWord} activeOpacity={0.5} onPress={() => setOpenModal(true)}>
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
                    <View style={styles.listWord}>
                        <FlatList 
                            data={wordData}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(value, index) => `${index}`}
                            renderItem={(item) => _renderItem(item)}
                        />
                    </View>
                        {_renderMdalAddWord()}
                        {_renderModalWordItem()}
                        {_renderDialogAddSub()}
                    
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
        bottom: 50,
        right: 50,
        width: 60,
        height: 60,
        borderRadius: 60,
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
        padding: 16
    },
    wordItem: {
        flex: 1,
        flexDirection: "row",
        alignItems:"flex-start",
        paddingTop: 8,
        paddingBottom: 16,
        borderBottomColor: '#ccc',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    modalAddWord:{
        height: metric.DEVIDE_HEIGHT*0.30,
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    modalWordItem :{
        height: metric.DEVIDE_HEIGHT*0.56,
        backgroundColor: '#fff',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    addDate:{
        flexDirection:"row",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 3,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: "#ccc",
        justifyContent:'center',
        alignItems:'center'
    },
    wordItemContainer:{
        flex: 1,
        padding: 16,
    },
    word_item_time: {
        paddingHorizontal:10,
        paddingVertical:8,
        borderRadius: 8,
        flexDirection: 'row',
        borderColor: '#ccc',
        borderWidth: StyleSheet.hairlineWidth

    }
})
export default WordScreen