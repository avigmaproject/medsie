import React from 'react';
import {View} from 'react-native';
import {Title, Text} from 'react-native-paper';

import ReadMore from '../../lib/read-more/read-more.lib'

import styles from './introduction.style';

const Introduction  = ({item}) => (
            <View style={styles.container}>
                <Title style={styles.title}>Introduction</Title>
                <ReadMore
                    numberOfLines={5}
                    textStyle={styles.introduction}>
                    <Text style={styles.introductions}>
                        {item.Buss_Description}
                    </Text>
            </ReadMore>
            </View>
        )

export default Introduction