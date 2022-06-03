import React, {Component} from 'react';
import {View, Image, Dimensions, TouchableOpacity} from 'react-native';
import {Title, Caption, Paragraph, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import StarRating from 'react-native-star-rating';
import Foundation from 'react-native-vector-icons/Foundation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Tooltip from 'react-native-walkthrough-tooltip';

import {Color} from '../../assets/color/color.assets';

import styles from './company-card.style';

const width = Dimensions.get('window').width;

class CompanyCard extends Component {
  constructor() {
    super();
    this.state = {
      toolTipVisible: false,
    };
  }
  render() {
    const {item} = this.props;
    const {toolTipVisible} = this.state;
    return (
      <View style={[styles.row, styles.container]}>
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
            <Tooltip
              animated={true}
              arrowSize={{width: 16, height: 8}}
              backgroundColor="rgba(0,0,0,0.5)"
              isVisible={toolTipVisible}
              content={<Text>{item.Sell_Name}</Text>}
              placement="bottom"
              onClose={() => this.setState({toolTipVisible: false})}>
              <TouchableOpacity
                onPress={() => this.setState({toolTipVisible: true})}>
                {icon(item.Buss_SellType)}
              </TouchableOpacity>
            </Tooltip>
          </View>
          <Caption>{item.Cat_Name}</Caption>
        </View>
      </View>
    );
  }
}

const text = (id) => {
  if (id === 1) return 'Recreational';
  else if (id === 2) return 'Medicinal';
  else if (id === 3) return 'Both';
};

const icon = (id) => {
  if (id === 1)
    return (
      <FontAwesome5
        name="cannabis"
        color={'green'}
        size={17}
        style={styles.icon}
      />
    );
  else if (id === 2)
    return (
      <Foundation name="plus" color={'green'} size={17} style={styles.icon} />
    );
  else if (id === 3) {
    return (
      <View style={styles.hor}>
        <FontAwesome5
          name="cannabis"
          color={'green'}
          size={17}
          style={styles.icon}
        />
        <Foundation name="plus" color={'green'} size={17} style={styles.icon} />
      </View>
    );
  }
};

export default CompanyCard;
