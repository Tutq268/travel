import axios from 'axios'
import URL from './../config/ApiUrl'
import AsyncStorage from '@react-native-community/async-storage'
const getInstance = () => {
    
    const instance = axios.create({
        baseURL: URL.baseUrl,
        timeout: 30000
    })
    instance.interceptors.request.use(
        async (config) => {
            let token = await AsyncStorage.getItem("userToken");
            if (!token) {
                return config
            }
            //add X-authen-token to every requests
            let header = { ...config.headers, 'authorization': "Bearer " +token };
            config.headers = header;

            return config;
        },
        (err) => {
            console.log("err: " + err)
            return Promise.reject(err)
        })


    return instance;
}
const API = {
instance : getInstance()
}

API.createAccount = (username,phone,password) => {
    const param = {
        username,phone,password
    }
    return API.instance.post("/auth/signup",param,{headers: {"Content-Type" : "application/json"}})
}

API.signIn = (username,password) =>{
    const param = {
        username,password
    }
    return API.instance.post("/auth/signin",param,{headers: {"Content-Type": "application/json"}})
}

API.getListTour = () =>{
    return API.instance.get("/tour/get-list")
}

API.getListUser = () =>{
    return API.instance.get("/tour/all-user")
}

API.addNewTour = param =>{
    return API.instance.post("/tour/add-new",param,{headers: {"Content-Type": "application/json"}})
}
API.bookedTour = count => {
    const param ={
        bookedTour: count
    }
    return API.instance.post("/tour/booked-tour",param)
}

API.getTourDetail = tourId =>{
    return API.instance.get(`/tour/tour-detail/${tourId}`)
}
API.getMe = () =>{
    return API.instance.get("/tour/get-me")
}
API.logOut = () =>{
    return API.instance.get("/tour/logout")
}

API.changeInfo = param =>{
    return API.instance.post("/user/edit-info",param)
}

API.changTour = param => {
    return API.instance.post("/tour/edit-tour",param)
}
export default API