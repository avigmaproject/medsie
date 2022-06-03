import React from 'react';
import {View, TouchableOpacity, FlatList} from 'react-native';
import {Text, Caption} from 'react-native-paper';
import ReadMore from '../../lib/read-more/read-more.lib';

import styles from './reply.style';

const Reply = ({item, navigation, show, id}) => (
  <View>
    <FlatList
      data={item.Reply_Trans_Master_DTO}
      renderItem={(item, index) => replies(navigation, item, show)}
      keyExtractor={(item, index) => item.id}
    />
    {show && (
      <View style={styles.reply}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('EditReply', {item: item, id: id})
          }>
          <Text style={styles.replyText}>Reply</Text>
        </TouchableOpacity>
      </View>
    )}
  </View>
);

const replies = (navigation, item, show) => (
  <View style={styles.container}>
    <ReadMore numberOfLines={5} textStyle={styles.introduction}>
      <Caption style={styles.introductions}>{item.item.Rep_Descp}</Caption>
    </ReadMore>
  </View>
);

export default Reply;
