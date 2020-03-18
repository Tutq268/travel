import React from 'react';
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import metrics from '../config/metrics';
import {scaledSize} from './../config/nomalize'
Icon.loadFont()

export default class TabBarIcon extends React.Component {
    render() {
        const { focused, name} = this.props;
        let iconName = 'ios-' + this.props.name;
        let isFocus=name === 'flower';
        return (
            <Icon
                style={{ justifyContent: 'center', alignItems: 'center', padding: 0, margin: 0 }}
                name={iconName}
                size={30}
                color={focused ? "#3271a8" : "#ccc"}
            />
        );
    }
}

