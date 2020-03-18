import { Dimensions,Platform } from 'react-native'

const IS_ADNDROID = Platform.OS === "android"
const {width,height} = Dimensions.get("window")

export default {
    ANDROID_STATUSBAR : 24,
    DEVIDE_HEIGHT: IS_ADNDROID ? height - 24: height,
    DEVIDE_WIDTH : width,
    IS_ADNDROID: IS_ADNDROID
}