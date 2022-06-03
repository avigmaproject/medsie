import React, {Component} from 'react';
import {View, TouchableOpacity, Image, Dimensions} from 'react-native';
import {Text, Caption, Card, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import StarRating from 'react-native-star-rating';

import {Color} from '../../assets/color/color.assets';
import Star from '../../assets/svg-files/starfilled.svg';
import StarOutline from '../../assets/svg-files/star-outline.svg';

import styles from './result-element.style';

const width = Dimensions.get('window').width;

const ResultElement = ({item, key, navigation}) => (
  <TouchableOpacity style={[styles.row, styles.container]} onPress={() => navigation.navigate('Listing', {id: item.Buss_PkId})}>
    <Image
      style={
        item.Buss_Image_Path
          ? styles.imageView
          : {width: 100, height: 100, resizeMode: 'center'}
      }
      source={
        item.Buss_Image_Path
          ? {uri: item.Buss_Image_Path}
          : require('../../assets/png-images/placeholder.png')
      }
    />
    <View style={styles.info}>
      <Title style={styles.title}>{item.Buss_Name}</Title>
      <View style={styles.rating}>
        <StarRating
          disabled={false}
          maxStars={5}
          rating={item.Rat_Rating}
          fullStar={'star'}
          emptyStar={'star-o'}
          fullStarColor={'orange'}
          emptyStarColor={'orange'}
          starSize={24}
        />
      </View>
      <Caption numberOfLines={2}>{item.Buss_Address}</Caption>
      <View style={[styles.row]}>
        <Icon name="place" color={Color.primaryColor} size={17} />
        <Caption style={styles.min}>{item.Distance} mi</Caption>
      </View>
      <Caption>{item.Cat_Name}</Caption>
    </View>
  </TouchableOpacity>
);

export default ResultElement;
