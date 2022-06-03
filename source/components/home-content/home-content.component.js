import React, {Component} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';

import SearchTextInput from '../search-text-input/search-text-input.component';
import StoreList from '../store-list/store-list.component';
import Categories from '../categories/categories.component';
import Filter from '../../assets/svg-files/filter.svg';
import {homeSearch} from '../../redux/home-item/home-item.action';
import {categories} from './home-content.list';

import styles from './home-content.style';

class HomeContent extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
    };
  }

  componentDidMount() {
    const {navigation, homeSearch} = this.props;
    navigation.addListener('focus', () => {
      homeSearch('');
    });
  }

  render() {
    const {navigation, homeSearch, search} = this.props;
    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View>
          <Text style={styles.title}>Find your store</Text>
          <View style={styles.searchView}>
            <SearchTextInput
              value={search}
              onChangeText={(search) => homeSearch(search)}
            />
            <TouchableOpacity
              style={styles.tune}
              onPress={() => navigation.navigate('FilterModal')}>
              <Filter width={30} height={30} />
            </TouchableOpacity>
          </View>
          <StoreList storeList={categories} navigation={navigation} />
          <Categories navigation={navigation} />
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  homeSearch: (search) => dispatch(homeSearch(search)),
});

const mapStateToProps = ({homeContent: {search}}) => ({
  search: search,
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContent);
