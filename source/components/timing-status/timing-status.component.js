import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import {Title, Text} from 'react-native-paper';
import moment from 'moment';
import 'moment-timezone';

import styles from './timing-status.style';

class TimingStatus  extends Component {
    constructor(){
        super();
    }

  renderTime = (item) => (
    <View style={[styles.row, styles.viewMargin]}>
        <View style={styles.rowContainer}>
            <Text style={styles.days}>{item.item.BHT_Weekdays}</Text>
        </View>
        <View style={styles.rowContainer}>
            <Text style={styles.time}>{item.item.BHT_FromTime} - {item.item.BHT_ToTime}</Text>
        </View>
    </View>
)

    render(){
        const {item} = this.props;
        return (
            <View style={styles.container}>
            <Title style={[styles.close, item.Buss_Open_Close ? {color: 'green'}:{color: 'red'} ]}> {item.Buss_Open_Close ? 'Open now' : 'Closed now'} </Title>
                <View>
                    <FlatList
                        data={item.businessHoursTransMaster_DTOs}
                        renderItem={(i) => this.renderTime(i)}
                        />
                </View>
            </View>
        )
    }
}

export default TimingStatus