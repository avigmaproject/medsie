import React, {Component} from 'react';
import {View, TouchableOpacity, Image, Dimensions} from 'react-native';
import {Text, Caption, Card, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StarRating from 'react-native-star-rating';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Color} from '../../assets/color/color.assets';
import Star from '../../assets/svg-files/starfilled.svg';
import StarOutline from '../../assets/svg-files/star-outline.svg';
import ReadMore from '../../lib/read-more/read-more.lib';

import styles from './list-page-element.style';

const width = Dimensions.get('window').width;

const ListPageElement = ({item, key, navigation}) => (
  <TouchableOpacity
    style={styles.cardView}
    key={key}
    onPress={() => navigation.navigate('Listing', {id: item.item.Buss_PkId})}>
    <Card style={styles.card}>
      <Image
        style={
          item.item.Buss_Image_Path
            ? styles.image
            : {width: width / 2.8, resizeMode: 'center', alignSelf: 'center'}
        }
        source={
          item.item.Buss_Image_Path
            ? {uri: item.item.Buss_Image_Path}
            : require('../../assets/png-images/placeholder.png')
        }
      />
      <View style={styles.body}>
        <Title style={styles.title}>{item.item.Buss_Name}</Title>
          {
              item.item.Buss_Description && (
                  <Caption style={styles.introductions}>{((item.item.Buss_Description).length > 50) ? (((item.item.Buss_Description).substring(0,50-3)) + '...') : item.item.Buss_Description }</Caption>
              )
          }
        <View style={styles.starView}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={item.item.Rat_Rating}
            fullStar={'star'}
            emptyStar={'star-o'}
            fullStarColor={'#FFBF00'}
            emptyStarColor={'#FFBF00'}
            starSize={30}
          />
        </View>
        <View style={styles.horizontalView}>
          <Icon name="place" color={Color.primaryColor} size={24} />
          <Text style={styles.place}>{item.item.Distance} mi</Text>
          {icon(item.item.Buss_SellType)}
        </View>
      </View>
    </Card>
  </TouchableOpacity>
);

const icon = (id) => {
  if (id === 1)
    return (
      <FontAwesome5
        name="cannabis"
        color={'green'}
        size={24}
        style={styles.icon}
      />
    );
  else if (id === 2)
    return (
      <Foundation name="plus" color={'green'} size={24} style={styles.icon} />
    );
  else if (id === 3) {
    return (
      <View style={styles.hor}>
        <FontAwesome5
          name="cannabis"
          color={'green'}
          size={24}
          style={styles.icon}
        />
        <Foundation name="plus" color={'green'} size={24} style={styles.icon} />
      </View>
    );
  }
};

export default ListPageElement;
