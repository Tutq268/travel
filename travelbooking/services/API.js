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
export default API