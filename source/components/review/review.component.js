import React from 'react';
import {View} from 'react-native';
import {Title, Text} from 'react-native-paper';
import StarRating from 'react-native-star-rating';

import RatingProgress from '../rating-progress/rating-progress.component'

import styles from './review.style';

const Reviews  = ({item}) => (
            <View style={styles.container}>
                <Title style={styles.title}>Reviews</Title>
                <View style={styles.row}>
                <View style={styles.center}>
                    <Text style={styles.rating}>{item.Rat_Rating}</Text>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={item.Rat_Rating ? item.Rat_Rating : 0}
                            fullStar= {'star'}
                            emptyStar= {'star-o'}
                            fullStarColor={'orange'}
                            emptyStarColor={'orange'}
                            starSize={20}/>
                    <Text style={styles.totalRating}> {item.Rat_Total} </Text>
                </View>
                <View style={styles.ratingContainer}>
                    <RatingProgress item={item}/>
                </View>
                </View>
            </View>
        )

export default Reviews