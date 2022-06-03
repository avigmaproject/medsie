import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Stars from 'react-native-stars';
import {Title, Caption, Paragraph} from 'react-native-paper';

import Star from '../../assets/svg-files/starfilled.svg';
import StarOutline from '../../assets/svg-files/star-outline.svg';
import InputText from '../../components/input-text/input-text.component';
import MultilineInput from '../../components/multiline-input/multiline-input.component';
import Button from '../../components/button/button.component';
import BackHeader from '../../components/back-header/back-header.component';
import {rating} from '../../configure/api/api.configure';

import styles from './write-reviews.style';

class WriteReviews extends Component {
  constructor() {
    super();
    this.state = {
      stars: 1,
      title: '',
      description: '',
    };
  }

  submit = async () => {
    const {route, navigation} = this.props;
    const {data, access_token} = route.params;
    const {stars, title, description} = this.state;
    let apiData = JSON.stringify({
      Type: 1,
      Rat_Rating: stars,
      Rat_Description: description,
      Rat_Title: title,
      Rat_BussID: data.Buss_PkId,
    });
    console.log('Datatingkkk: ', apiData);
    await rating(apiData, access_token)
      .then((response) => {
        console.log(response);
        navigation.goBack();
      })
      .catch((error) => {
        console.log('Error in submit', error);
      });
  };

  render() {
    const {title, description, stars} = this.state;
    const {navigation, route} = this.props;
    const {data} = route.params;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.back}>
            <BackHeader title="Back" navigation={navigation} />
          </View>
          <View>
            <View style={[styles.row, styles.innercontainer]}>
              <Image
                source={{uri: data.Buss_Image_Path}}
                style={styles.imageView}
              />
              <View style={styles.info}>
                <Title style={styles.title}>{data.Buss_Name}</Title>
              </View>
            </View>
            <Stars
              default={stars}
              update={(val) => {
                this.setState({stars: val});
              }}
              spacing={4}
              starSize={40}
              count={5}
              fullStar={<Star width={40} height={40} />}
              emptyStar={<StarOutline width={40} height={40} />}
            />
          </View>
          <View>
            <View style={styles.inputContainer}>
              <InputText
                placeHolder="Title"
                value={title}
                keyboardType="default"
                onChangeText={(title) => this.setState({title})}
              />
            </View>
            <View style={styles.inputContainer}>
              <MultilineInput
                placeHolder="Description"
                value={description}
                keyboardType="default"
                onChangeText={(description) => this.setState({description})}
              />
            </View>
            <View style={styles.buttonContainer}>
              <Button title="Submit review" onPress={() => this.submit()} />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default WriteReviews;
