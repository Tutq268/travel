import {Dimensions, Platform} from 'react-native'

const { width, height } = Dimensions.get('window');

const isAndroid=Platform.OS==='android';
// Use iPhone6 as base size which is 375 x 667
const baseWidth = isAndroid?414:375;
const baseHeight = isAndroid?818:667;

const scaleWidth = width / baseWidth;
const scaleHeight = height / baseHeight;
const scale = Math.min(scaleWidth, scaleHeight);

export const scaledSize =
    (size) => Math.ceil((size * scale));
