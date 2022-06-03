import React, {Component} from 'react';
import {View} from 'react-native';
import {Text, Caption, Card, Title, Badge} from 'react-native-paper';
import StarRating from 'react-native-star-rating';

import NoBackgroundButton from '../no-background-button/no-background-button.component';

import styles from './manage-store-element.style';

const ManageStoreElement = ({item, key, navigation}) => (
  <Card style={styles.manageStore}>
    <View style={styles.row}>
      <View style={styles.innerContainer}>
        <Title>{item.Buss_Name}</Title>
        <View style={styles.starView}>
          <StarRating
            disabled={false}
            maxStars={5}
            rating={item.Rat_Rating}
            fullStar={'star'}
            emptyStar={'star-o'}
            fullStarColor={'#FFBF00'}
            emptyStarColor={'#FFBF00'}
            starSize={20}
          />
        </View>
      </View>
      <Badge size={24} style={styles.visit}>
        {item.Buss_Vist_Count}
      </Badge>
    </View>
    <View style={[styles.buttonContainer, styles.horizontal]}>
      <NoBackgroundButton
        title="Edit Store Settings"
        onPress={() => navigate(navigation, item)}
      />
      <NoBackgroundButton
        title="Review"
        onPress={() =>
          navigation.navigate('ReplyReview', {BussId: item.Buss_PkId})
        }
      />
    </View>
  </Card>
);

const navigate = (navigation, item) => {
  navigation.navigate('EditStore', {data: item});
  console.log("Data: Nav, ", item)
};

export default ManageStoreElement;
