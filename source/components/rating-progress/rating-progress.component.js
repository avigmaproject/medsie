import React from 'react';
import {View, FlatList, Text} from 'react-native';
import * as Progress from 'react-native-progress';

import {Color} from '../../assets/color/color.assets'

import styles from './rating-progress.style';

const RatingProgress = ({item}) => (
    <View style={styles.container}>
        {item.RatingMaster_Count ? renderRatingProgressFive(item.RatingMaster_Count[0].Rat_Count5, item.Rat_Total) : <View/>}
        {item.RatingMaster_Count ? renderRatingProgressFour(item.RatingMaster_Count[0].Rat_Count4, item.Rat_Total) : <View/>}
        {item.RatingMaster_Count ? renderRatingProgressThree(item.RatingMaster_Count[0].Rat_Count3, item.Rat_Total) : <View/>}
        {item.RatingMaster_Count ? renderRatingProgressTwo(item.RatingMaster_Count[0].Rat_Count2, item.Rat_Total) : <View/>}
        {item.RatingMaster_Count ? renderRatingProgressOne(item.RatingMaster_Count[0].Rat_Count1, item.Rat_Total) : <View/>}
    </View>
)


renderRatingProgressOne = (rate, total) => (
    <View style={styles.row}>
        <Text style={styles.margin}>1 star</Text>
        <View style={[styles.center, styles.margin]}>
            <Progress.Bar progress={getRating(rate,total)} width={180} color={'red'}/>
        </View>
        <Text>{rate}</Text>
    </View>
)

renderRatingProgressTwo = (rate, total) => (
    <View style={styles.row}>
        <Text style={styles.margin}>2 star</Text>
        <View style={[styles.center, styles.margin]}>
            <Progress.Bar progress={getRating(rate,total)} width={180} color={'orange'}/>
        </View>
        <Text>{rate}</Text>
    </View>
)

renderRatingProgressThree = (rate, total) => (
    <View style={styles.row}>
        <Text style={styles.margin}>3 star</Text>
        <View style={[styles.center, styles.margin]}>
            <Progress.Bar progress={getRating(rate,total)} width={180} color={'#FFBF00'}/>
        </View>
        <Text>{rate}</Text>
    </View>
)

renderRatingProgressFour = (rate, total) => (
    <View style={styles.row}>
        <Text style={styles.margin}>4 star</Text>
        <View style={[styles.center, styles.margin]}>
            <Progress.Bar progress={getRating(rate,total)} width={180} color={'lightgreen'}/>
        </View>
        <Text>{rate}</Text>
    </View>
)

renderRatingProgressFive = (rate, total) => (
    <View style={styles.row}>
        <Text style={styles.margin}>5 star</Text>
        <View style={[styles.center, styles.margin]}>
            <Progress.Bar progress={getRating(rate,total)} width={180} color={'green'}/>
        </View>
        <Text>{rate}</Text>
    </View>
)

getRating = (rate, total) =>  total === 0 ? 0 : rate / total

export default RatingProgress;