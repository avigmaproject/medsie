import React, {Component} from 'react';
import {View, ScrollView, SafeAreaView} from 'react-native';
import {Text, Caption} from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import AsyncStorage from '@react-native-community/async-storage';
import { Toast } from 'native-base';

import MultilineInput from '../../components/multiline-input/multiline-input.component';
import ReadMore from '../../lib/read-more/read-more.lib'
import Button from '../../components/button/button.component';
import BackHeader from '../../components/back-header/back-header.component';
import {reply} from '../../configure/api/api.configure'

import styles from './edit-reply.style';

class EditReply extends Component {
    constructor(){
        super();
        this.state = {
            description: ''
        }
    }

    submit = async () => {
        const { description } = this.state;
        const {route, navigation} = this.props;
        const {item, id} = route.params;
        if (description.length !== 0){
            let data = JSON.stringify({
                Rep_PKId : 0,
                Rep_RatID : item.Rat_PkId,
                Rep_Buss_PkId : id,
                Rep_Descp : description,
                Type : 1,
            })
            console.log("API: ", data);
            try{
                let access_token = await AsyncStorage.getItem('access_token');
                await reply(data, JSON.parse(access_token))
                .then(response => {
                    console.log("Response Reply: ", response)
                    navigation.goBack();
                })
                .catch(error => console.log("Error: ", error))
            } catch(error){
                console.log("Catch Error: ", error)
            }
        }else {
            this.showMessage('Enter reply to submit')
        }
    }

    showMessage = (message) => {
        Toast.show({
            text: message,
            style: styles.toasttxt
    })
    }

    render(){
        const {route, navigation} = this.props;
        const {item} = route.params;
        const {description} = this.state;
        return (
            <SafeAreaView>
                <ScrollView keyboardShouldPersistTaps='handled'>
                    <View style={styles.container}>
                    <BackHeader title="Back" navigation={navigation}/>
                        <View>
                            <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={item.Rat_Rating}
                            fullStar= {'star'}
                            emptyStar= {'star-o'}
                            fullStarColor={'orange'}
                            emptyStarColor={'orange'}
                            starSize={45}/>
                        </View>
                        <Text style={styles.title}>{item.Rat_Title}</Text>
                        <Caption style={styles.introductions}>
                            {item.Rat_Description}
                        </Caption>
                        <View style={styles.inputContainer}>
                            <MultilineInput
                                placeHolder="Reply"
                                value={description}
                                keyboardType="default"
                                onChangeText={(description) => this.setState({ description })}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Button title="Submit" onPress={() => this.submit()}/>
                    </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

export default EditReply;